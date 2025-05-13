'use client';

import { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import Image from 'next/image';
import Section from '../../../../components/layout/Section';
import { Send, Star } from 'lucide-react';
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

const BattleDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const battle = useSelector((state: RootState) => state.battle.currentBattle) as Battle | null;

    const [ended, setEnded] = useState(false);
    const [loadingRound, setLoadingRound] = useState(false);

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
            } catch (err) {
                console.error('Failed to fetch battle:', err);
            }
        };

        if (id) fetchBattle();
    }, [id, dispatch]);

    const handleCreateRound = async () => {
        setLoadingRound(true);
        try {
            const res = await api.post('/premium/create-round', {
                battle_id: battle?.id,
                description: battle?.description,
                target_language:
                    battle?.type === 'Text Translation' ? battle.target_language : undefined,
                programming_language:
                    battle?.type === 'Code Generation' ? battle.programming_language : undefined,
            });

            const data = res.data.data;

            const newRound = {
                id: data.id,
                responses: [
                    {
                        ai_model_name: data.ai_model_1_name,
                        response_text: data.ai_model_1_response,
                    },
                    {
                        ai_model_name: data.ai_model_2_name,
                        response_text: data.ai_model_2_response,
                    },
                ],
            };

            dispatch(addRound(newRound));
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
            <div className="border border-lime-300 p-4 space-y-8 rounded-md bg-dark-white">
                {battle.rounds.map((round, i) => (
                    <div key={`round-${round.id}-${i}`} className="my-8">
                        <h3 className="text-lg font-semibold">Round {i + 1}</h3>

                        <div className="flex flex-col gap-4 mt-6">
                            {/* First AI */}
                            {round.responses[0] && (
                                <div className="flex w-full items-start gap-2">
                                    <div className="relative flex items-center">
                                        <span className="absolute left-[-65px] w-max rotate-[-90deg] text-primary text-[10px]">
                                            {round.responses[0].ai_model_name}
                                        </span>
                                        <Image
                                            src={getModelImage(round.responses[0].ai_model_name)}
                                            alt={round.responses[0].ai_model_name}
                                            width={50}
                                            height={50}
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
                                        <div className="bg-white text-black p-3 rounded text-sm max-w-[85%]">
                                            {round.responses[0].response_text}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Second AI */}
                            {round.responses[1] && (
                                <div className="flex w-full items-start justify-start flex-row-reverse gap-2">
                                    <div className="relative flex items-center">
                                        <span className="absolute right-[-70px] rotate-[90deg] text-primary text-[10px]">
                                            {round.responses[1].ai_model_name}
                                        </span>
                                        <Image
                                            src={getModelImage(round.responses[1].ai_model_name)}
                                            alt={round.responses[1].ai_model_name}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
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
                                        <div className="bg-white text-black p-3 rounded text-sm w-[85%]">
                                            {round.responses[1].response_text}
                                        </div>
                                    )}
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
                        <div className="flex items-center gap-4 text-right">
                            {battle.ai_models.map((model) => (
                                <Button key={model.name} className="bg-primary text-black">
                                    <Star className="mr-1" />
                                    Vote for {model.name}
                                </Button>
                            ))}
                        </div>
                        <p className="mt-4 text-gray-300">
                            {battle.ai_models[0].name}: {battle.ai_models[0].votes}{' '}
                            &nbsp;&nbsp;&nbsp;
                            {battle.ai_models[1].name}: {battle.ai_models[1].votes}
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
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Image
                                    src="/images/no-user-profile-pic.jpeg"
                                    alt="Jorge Katto"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <span className="font-semibold">Jorge Katto</span>
                            </div>
                            <p className="text-gray-400 text-sm">I liked the debate.</p>
                        </div>
                    </div>
                </>
            )}
        </Section>
    );
};

export default BattleDetailsPage;
