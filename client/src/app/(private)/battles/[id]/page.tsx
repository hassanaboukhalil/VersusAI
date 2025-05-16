'use client';

import { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import Image from 'next/image';
import Section from '../../../../components/layout/Section';
import { Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { getModelImage } from '../../../../utils/getModelImage';
import { useParams } from 'next/navigation';
import { addRound, setCurrentBattle } from '../../../../redux/slices/battleSlice';
import api from '../../../../lib/axios';
import { Skeleton } from '../../../../components/ui/Skeleton';
import { Loader2 } from 'lucide-react';
import CodeResponse from '../../../../components/global/CodeResponse';
import type { Battle, Response, Round } from '../../../../types/battle';
import { voteForAiModel, unvoteFromBattle } from '../../../api/battle';
import { getUser } from '../../../../lib/auth';
import { toast } from 'sonner';
import socket from '../../../../lib/socket';
// import Echo from '../../../../lib/echo';

const BattleDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const battle = useSelector((state: RootState) => state.battle.currentBattle) as Battle | null;

    const [ended, setEnded] = useState(false);
    const [loadingRound, setLoadingRound] = useState(false);
    const [loadingVote, setLoadingVote] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [votedModel, setVotedModel] = useState<string>('');

    useEffect(() => {
        const fetchBattle = async () => {
            try {
                const res = await api.get(`/get-battle/${id}`);
                const data = res.data.data;

                dispatch(
                    setCurrentBattle({
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        type: data.type,
                        target_language: data.target_language,
                        programming_language: data.programming_language,
                        debate_title_1: data.debate_title_1,
                        debate_title_2: data.debate_title_2,
                        is_active: data.is_active,
                        ai_models: data.ai_models,
                        user: data.user,
                        rounds: data.rounds.map((round: Round) => ({
                            id: round.id,
                            responses: round.responses.map((resp: Response) => ({
                                ai_model_name: resp.ai_model_name,
                                response_text: resp.response_text,
                            })),
                        })),
                    })
                );

                setEnded(!data.is_active);

                // Check if user has voted on this battle
                const userId = getUser()?.id;
                if (userId) {
                    api.get(`/battles/${data.id}/user-vote?user_id=${userId}`)
                        .then((res) => {
                            setHasVoted(res.data.data.hasVoted || false);
                            // Set the voted model name if the user has voted
                            if (res.data.data.hasVoted) {
                                setVotedModel(res.data.data.votedModel || '');
                            }
                        })
                        .catch((err) => {
                            console.error('Failed to check vote status:', err);
                        });
                }
            } catch (err) {
                console.error('Failed to fetch battle:', err);
            }
        };

        if (id) fetchBattle();
    }, [id, dispatch]);

    useEffect(() => {
        if (!battle?.id) return;

        const channelName = `vote_update_${battle.id}`;

        socket.on(channelName, (data: { modelName: string; totalVotes: number }) => {
            if (!data?.modelName || typeof data.totalVotes !== 'number') {
                console.warn('Invalid vote data received:', data);
                return;
            }

            const updatedBattle = {
                ...battle,
                ai_models: battle.ai_models.map((model) =>
                    model.name === data.modelName ? { ...model, votes: data.totalVotes } : model
                ),
            };

            console.log('Updating battle state with:', updatedBattle.ai_models);
            dispatch(setCurrentBattle(updatedBattle));
        });

        return () => {
            socket.off(channelName);
        };
    }, [battle?.id, battle, dispatch]);

    const handleCreateRound = async () => {
        setLoadingRound(true);
        try {
            if (battle?.type === 'Debate Challenge') {
                // Get the last response from the rounds
                const lastRound = battle.rounds[battle.rounds.length - 1];
                const lastResponse = lastRound?.responses[lastRound.responses.length - 1];

                // For debate challenges, alternate between AI responses
                if (!lastRound || lastRound.responses.length === 2) {
                    // Start a new round with first AI
                    const res = await api.post('/premium/create-debate-response', {
                        battle_id: battle.id,
                        debate_title_1: battle.debate_title_1,
                        debate_title_2: battle.debate_title_2,
                        is_first_response: true,
                        opponent_response: lastResponse?.response_text,
                    });

                    const data = res.data.data;
                    const newRound = {
                        id: data.id,
                        responses: [
                            {
                                ai_model_name: data.ai_model_name,
                                response_text: data.response_text,
                                response_time_ms: data.response_time_ms,
                                prompt_tokens: data.prompt_tokens,
                                completion_tokens: data.completion_tokens,
                            },
                        ],
                    };
                    dispatch(addRound(newRound));
                } else if (lastRound.responses.length === 1) {
                    // Add second AI's response to current round
                    const res = await api.post('/premium/create-debate-response', {
                        battle_id: battle.id,
                        debate_title_1: battle.debate_title_1,
                        debate_title_2: battle.debate_title_2,
                        is_first_response: false,
                        opponent_response: lastResponse?.response_text,
                        round_id: lastRound.id,
                    });

                    const data = res.data.data;
                    const updatedRound = {
                        ...lastRound,
                        responses: [
                            ...lastRound.responses,
                            {
                                ai_model_name: data.ai_model_name,
                                response_text: data.response_text,
                            },
                        ],
                    };

                    dispatch(
                        setCurrentBattle({
                            ...battle,
                            rounds: battle.rounds.map((r) =>
                                r.id === lastRound.id ? updatedRound : r
                            ),
                        })
                    );
                }
            } else {
                // Handle other battle types as before
                const res = await api.post('/premium/create-round', {
                    battle_id: battle?.id,
                    description: battle?.description,
                    target_language:
                        battle?.type === 'Text Translation' ? battle.target_language : undefined,
                    programming_language:
                        battle?.type === 'Code Generation'
                            ? battle.programming_language
                            : undefined,
                });

                const data = res.data.data;
                const newRound = {
                    id: data.id,
                    responses: [
                        {
                            ai_model_name: data.ai_model_1_name,
                            response_text: data.ai_model_1_response,
                            response_time_ms: data.response_time_ms,
                            prompt_tokens: data.prompt_tokens,
                            completion_tokens: data.completion_tokens,
                        },
                        {
                            ai_model_name: data.ai_model_2_name,
                            response_text: data.ai_model_2_response,
                            response_time_ms: data.response_time_ms,
                            prompt_tokens: data.prompt_tokens,
                            completion_tokens: data.completion_tokens,
                        },
                    ],
                };
                dispatch(addRound(newRound));
            }
        } catch (err) {
            console.error('Failed to create new round:', err);
        } finally {
            setLoadingRound(false);
        }
    };

    const handleEndBattle = async () => {
        if (!battle) return;

        try {
            await api.patch(`/premium/battles/${battle.id}/end`);
            setEnded(true);
        } catch (error) {
            console.error('Failed to end battle:', error);
        }
    };

    const handleVote = async (aiModelName: string) => {
        if (!battle || loadingVote) return;

        setLoadingVote(true);
        try {
            console.log('Attempting to vote for:', {
                aiModelName,
                available_models: battle.ai_models,
                battle_id: battle.id,
            });

            const result = await voteForAiModel(battle.id.toString(), aiModelName);
            console.log('Vote response:', result);

            if (result.success) {
                // Update local state immediately with the returned vote counts
                const updatedBattle = {
                    ...battle,
                    ai_models: battle.ai_models.map((model) => ({
                        ...model,
                        votes: result.data.votes[model.name] || 0,
                    })),
                };
                console.log('Updating battle state with:', updatedBattle);
                dispatch(setCurrentBattle(updatedBattle));

                // emiting an event to the socket server after user votes
                socket.emit('vote', {
                    battleId: battle.id,
                    modelName: aiModelName,
                    totalVotes: result.data.votes[aiModelName] || 0,
                });

                setHasVoted(true);
                setVotedModel(aiModelName);
                toast.success(result.message || 'Vote recorded successfully!');
            } else {
                console.error('Vote failed:', result);
                toast.error(result.message || 'Failed to record vote');
            }
        } catch (error) {
            console.error('Failed to vote:', error);
            toast.error('Failed to record vote. Please try again.');
        } finally {
            setLoadingVote(false);
        }
    };

    const handleUnvote = async () => {
        if (!battle || loadingVote) return;

        setLoadingVote(true);
        try {
            const result = await unvoteFromBattle(battle.id.toString());
            console.log('Unvote response:', result);

            if (result.success) {
                // Update local state with the returned vote counts
                const updatedBattle = {
                    ...battle,
                    ai_models: battle.ai_models.map((model) => ({
                        ...model,
                        votes: result.data.votes[model.name] || 0,
                    })),
                };
                console.log('Updating battle state after unvote:', updatedBattle);
                dispatch(setCurrentBattle(updatedBattle));
                setHasVoted(false);
                setVotedModel('');
                toast.success(result.message || 'Vote removed successfully!');
            } else {
                console.error('Unvote failed:', result);
                toast.error(result.message || 'Failed to remove vote');
            }
        } catch (error) {
            console.error('Failed to unvote:', error);
            toast.error('Failed to remove vote. Please try again.');
        } finally {
            setLoadingVote(false);
        }
    };

    if (!battle) {
        return (
            <Section className="bg-background text-white px-6 py-10 mx-auto min-h-screen">
                {/* <p className="text-center text-gray-400">Battle not found. Please try again.</p> */}
                <div className="flex w-full space-x-4">
                    <div className="flex flex-col gap-4 w-full">
                        <Skeleton className="h-4 w-[250px] bg-dark-white" />
                        <Skeleton className="h-40 w-full bg-dark-white" />
                    </div>
                </div>
            </Section>
        );
    }

    return (
        <Section className="bg-background text-white px-6 py-10 mx-auto">
            <h1 className="text-2xl font-bold">{battle.title}</h1>
            <p className="mt-2 text-primary">{battle.type}</p>
            <p className="text-gray-300 mt-6 mb-6">{battle.description}</p>
            {battle.type === 'Text Translation' && battle.target_language && (
                <p className="text-primary mb-6">
                    Target Language: <span className="text-white">{battle.target_language}</span>
                </p>
            )}
            {battle.type === 'Code Generation' && battle.programming_language && (
                <p className="text-primary mb-6">
                    Programming Language:{' '}
                    <span className="text-white">{battle.programming_language}</span>
                </p>
            )}
            {battle.type === 'Debate Challenge' &&
                battle.debate_title_1 &&
                battle.debate_title_2 && (
                    <div className="flex flex-col gap-2 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-primary">
                                AI Model 1 ({battle.ai_models[0].name}) argues for:
                            </span>
                            <span className="text-white font-medium">{battle.debate_title_1}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-primary">
                                AI Model 2 ({battle.ai_models[1].name}) argues for:
                            </span>
                            <span className="text-white font-medium">{battle.debate_title_2}</span>
                        </div>
                    </div>
                )}

            {/* Battle Rounds */}
            <div className="border border-lime-300 p-6 space-y-10 rounded-xl bg-white/5 shadow-md">
                {battle.rounds.map((round, i) => (
                    <div key={`round-${round.id}-${i}`} className="space-y-6">
                        {battle.type !== 'Debate Challenge' && (
                            <h3 className="text-xl font-bold text-lime-300">Round {i + 1}</h3>
                        )}

                        <div className="flex flex-col gap-6">
                            <h2 className="text-lg font-bold text-lime-300">
                                Analysis of the round
                            </h2>

                            {/*  AI 1 */}
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-gray-400">
                                    Response Time {round.responses[0].ai_model_name}:{' '}
                                    {round.responses[0].response_time_ms} ms
                                </p>
                                <p className="text-sm text-gray-400">
                                    Prompt Tokens {round.responses[0].ai_model_name}:{' '}
                                    {round.responses[0].prompt_tokens}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Completion Tokens {round.responses[0].ai_model_name}:{' '}
                                    {round.responses[0].completion_tokens}
                                </p>
                            </div>

                            {/*  AI 2 */}
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-gray-400">
                                    Response Time {round.responses[1].ai_model_name}:{' '}
                                    {round.responses[1].response_time_ms} ms
                                </p>
                                <p className="text-sm text-gray-400">
                                    Prompt Tokens {round.responses[1].ai_model_name}:{' '}
                                    {round.responses[1].prompt_tokens}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Completion Tokens {round.responses[1].ai_model_name}:{' '}
                                    {round.responses[1].completion_tokens}
                                </p>
                            </div>
                        </div>

                        <div
                            className={`flex flex-col gap-6 ${battle.type === 'Debate Challenge' ? 'mt-0' : 'mt-4'}`}
                        >
                            {/* First AI */}
                            {round.responses[0] && (
                                <div className="flex w-full items-start gap-4">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="text-xs text-center text-lime-200 bg-lime-800/20 px-2 py-1 rounded-full">
                                            {round.responses[0].ai_model_name}
                                        </div>
                                        <Image
                                            src={getModelImage(round.responses[0].ai_model_name)}
                                            alt={round.responses[0].ai_model_name}
                                            width={48}
                                            height={48}
                                            className="rounded-full border border-lime-300 shadow"
                                        />
                                    </div>
                                    {battle.type === 'Code Generation' ? (
                                        <div className="max-w-[85%] w-full">
                                            <CodeResponse
                                                code={round.responses[0].response_text}
                                                language={
                                                    battle.programming_language || 'javascript'
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-white text-black p-4 rounded-lg text-sm max-w-[85%] shadow">
                                            {round.responses[0].response_text}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Second AI */}
                            {round.responses[1] && (
                                <div className="flex w-full items-start justify-end gap-4">
                                    {battle.type === 'Code Generation' ? (
                                        <div className="w-[85%]">
                                            <CodeResponse
                                                code={round.responses[1].response_text}
                                                language={
                                                    battle.programming_language || 'javascript'
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-white text-black p-4 rounded-lg text-sm w-[85%] shadow">
                                            {round.responses[1].response_text}
                                        </div>
                                    )}
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="text-xs text-center text-indigo-200 bg-indigo-800/20 px-2 py-1 rounded-full">
                                            {round.responses[1].ai_model_name}
                                        </div>
                                        <Image
                                            src={getModelImage(round.responses[1].ai_model_name)}
                                            alt={round.responses[1].ai_model_name}
                                            width={48}
                                            height={48}
                                            className="rounded-full border border-indigo-300 shadow"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Battle Controls */}
            {!ended ? (
                <div className="flex justify-start mt-6 gap-4">
                    <Button
                        onClick={handleCreateRound}
                        className="bg-[#2C2C2C] text-white border border-[#DEFE01] hover:bg-[#dcfe0198]"
                        disabled={loadingRound}
                    >
                        {loadingRound ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Please wait…
                            </>
                        ) : battle.type === 'Debate Challenge' ? (
                            'Continue'
                        ) : (
                            'Give another results'
                        )}
                    </Button>
                    <Button variant="default" onClick={handleEndBattle}>
                        End Battle
                    </Button>
                </div>
            ) : (
                <>
                    {/* Votes */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2">Votes</h3>
                        <div className="flex items-center gap-4 text-right w-full">
                            {hasVoted ? (
                                <Button
                                    className="bg-red-500 text-white hover:bg-red-600"
                                    onClick={handleUnvote}
                                    disabled={loadingVote}
                                >
                                    {loadingVote ? (
                                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    ) : (
                                        <>Removing Vote {votedModel && `for ${votedModel}`}</>
                                    )}
                                </Button>
                            ) : (
                                battle?.ai_models.map((model) => (
                                    // <Button
                                    //     key={model.name}
                                    //     className="bg-primary text-black"
                                    //     onClick={() => handleVote(model.name)}
                                    //     disabled={loadingVote}
                                    // >
                                    //     {loadingVote ? (
                                    //         <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    //     ) : (
                                    //         <Star className="mr-1" />
                                    //     )}
                                    //     Vote for {model.name}
                                    // </Button>
                                    <Button
                                        key={model.name}
                                        type="submit"
                                        className="bg-primary text-black hover:opacity-90"
                                        isLoading={loadingVote}
                                        loadingText="Please wait..."
                                        onClick={() => handleVote(model.name)}
                                    >
                                        Vote for {model.name}
                                    </Button>
                                ))
                            )}
                        </div>
                        <div className="flex gap-4 mt-6 text-sm text-gray-300">
                            {battle?.ai_models.map((model) => (
                                <span
                                    key={model.name}
                                    className="px-3 py-1 bg-gray-800 rounded-full border border-gray-600"
                                >
                                    {model.name}: {model.votes || 0} vote
                                    {(model.votes || 0) === 1 ? '' : 's'}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="text-gray-300">
                            Created by {battle?.user.first_name} {battle?.user.last_name}
                        </p>
                    </div>

                    {/* Comment Box */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-2">Write a comment</h3>
                        <div className="bg-white relative rounded-md flex items-center">
                            <Input
                                placeholder="Write a comment…"
                                className="text-black bg-white rounded-md m-0 h-[3rem]"
                            />
                            <Send color="black" className="absolute right-[8px]" />
                        </div>
                    </div>

                    {/* Static Comment */}
                    <div className="mt-6 space-y-4">
                        <div className="bg-white/5 p-4 rounded-md border border-gray-600 shadow">
                            <div className="flex items-center gap-4 mb-3">
                                <Image
                                    src={
                                        battle?.user.profile_picture_url ||
                                        '/images/no-user-profile-pic.jpeg'
                                    }
                                    alt={`${battle?.user.first_name} ${battle?.user.last_name}`}
                                    width={40}
                                    height={40}
                                    className="rounded-full border border-white shadow-sm"
                                />
                                <div className="flex flex-col leading-tight">
                                    <span className="font-semibold text-white text-sm">
                                        {battle?.user.first_name} {battle?.user.last_name}
                                    </span>
                                    <span className="text-gray-400 text-xs mt-0.5">
                                        @{battle?.user.username}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-300">I liked the debate.</p>
                        </div>
                    </div>
                </>
            )}
        </Section>
    );
};

export default BattleDetailsPage;
