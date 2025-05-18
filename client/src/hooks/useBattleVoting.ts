import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentBattle } from '../redux/slices/battleSlice';
import { voteForAiModel, unvoteFromBattle } from '../app/api/voteApi';
import api from '../lib/axios';
import { getUser } from '../lib/auth';
import { toast } from 'sonner';
import socket from '../lib/socket';
import type { Battle } from '../types/battle';

export const useBattleVoting = (battle: Battle | null) => {
    const [loadingVote, setLoadingVote] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [votedModel, setVotedModel] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!battle) return;

        // Check if user has voted on this battle
        const checkUserVote = async () => {
            const userId = getUser()?.id;
            if (userId) {
                try {
                    const res = await api.get(`/battles/${battle.id}/user-vote?user_id=${userId}`);
                    setHasVoted(res.data.data.hasVoted || false);
                    // Set the voted model name if the user has voted
                    if (res.data.data.hasVoted) {
                        setVotedModel(res.data.data.votedModel || '');
                    }
                } catch (err) {
                    console.error('Failed to check vote status:', err);
                }
            }
        };

        checkUserVote();
    }, [battle]);

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

            dispatch(setCurrentBattle(updatedBattle));
        });

        return () => {
            socket.off(channelName);
        };
    }, [battle?.id, battle, dispatch]);

    const vote = async (aiModelName: string) => {
        if (!battle || loadingVote) return;

        setLoadingVote(true);
        try {
            const result = await voteForAiModel(battle.id.toString(), aiModelName);

            if (result.success) {
                // Update local state immediately with the returned vote counts
                const updatedBattle = {
                    ...battle,
                    ai_models: battle.ai_models.map((model) => ({
                        ...model,
                        votes: result.data.votes[model.name] || 0,
                    })),
                };
                dispatch(setCurrentBattle(updatedBattle));

                // Emit an event to the socket server after user votes
                socket.emit('vote', {
                    battleId: battle.id,
                    modelName: aiModelName,
                    totalVotes: result.data.votes[aiModelName] || 0,
                });

                setHasVoted(true);
                setVotedModel(aiModelName);
                toast.success(result.message || 'Vote recorded successfully!');
            } else {
                toast.error(result.message || 'Failed to record vote');
            }
        } catch (error) {
            console.error('Failed to vote:', error);
            toast.error('Failed to record vote. Please try again.');
        } finally {
            setLoadingVote(false);
        }
    };

    const unvote = async () => {
        if (!battle || loadingVote) return;

        setLoadingVote(true);
        try {
            const result = await unvoteFromBattle(battle.id.toString());

            if (result.success) {
                // Update local state with the returned vote counts
                const updatedBattle = {
                    ...battle,
                    ai_models: battle.ai_models.map((model) => ({
                        ...model,
                        votes: result.data.votes[model.name] || 0,
                    })),
                };
                dispatch(setCurrentBattle(updatedBattle));
                setHasVoted(false);
                setVotedModel('');
                toast.success(result.message || 'Vote removed successfully!');
            } else {
                toast.error(result.message || 'Failed to remove vote');
            }
        } catch (error) {
            console.error('Failed to unvote:', error);
            toast.error('Failed to remove vote. Please try again.');
        } finally {
            setLoadingVote(false);
        }
    };

    return {
        loadingVote,
        hasVoted,
        votedModel,
        vote,
        unvote,
    };
};
