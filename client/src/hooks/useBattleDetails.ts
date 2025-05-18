import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentBattle, addRound } from '../redux/slices/battleSlice';
import api from '../lib/axios';
import { RootState } from '../redux/store';
import type { Battle, Response, Round } from '../types/battle';

export const useBattleDetails = (battleId: string) => {
    const dispatch = useDispatch();
    const battle = useSelector((state: RootState) => state.battle.currentBattle) as Battle | null;
    const [ended, setEnded] = useState(false);
    const [loadingRound, setLoadingRound] = useState(false);

    const fetchBattle = async () => {
        try {
            const res = await api.get(`/get-battle/${battleId}`);
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
                            response_time_ms: resp.response_time_ms,
                            prompt_tokens: resp.prompt_tokens,
                            completion_tokens: resp.completion_tokens,
                        })),
                    })),
                })
            );

            setEnded(!data.is_active);
        } catch (err) {
            console.error('Failed to fetch battle:', err);
        }
    };

    const createRound = async () => {
        if (!battle) return;

        setLoadingRound(true);
        try {
            if (battle.type === 'Debate Challenge') {
                await handleDebateRound();
            } else {
                await handleStandardRound();
            }
        } catch (err) {
            console.error('Failed to create new round:', err);
        } finally {
            setLoadingRound(false);
        }
    };

    const handleDebateRound = async () => {
        if (!battle) return;

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
                        response_time_ms: data.response_time_ms,
                        prompt_tokens: data.prompt_tokens,
                        completion_tokens: data.completion_tokens,
                    },
                ],
            };

            dispatch(
                setCurrentBattle({
                    ...battle,
                    rounds: battle.rounds.map((r) => (r.id === lastRound.id ? updatedRound : r)),
                })
            );
        }
    };

    const handleStandardRound = async () => {
        if (!battle) return;

        const res = await api.post('/premium/create-round', {
            battle_id: battle.id,
            description: battle.description,
            target_language:
                battle.type === 'Text Translation' ? battle.target_language : undefined,
            programming_language:
                battle.type === 'Code Generation' ? battle.programming_language : undefined,
        });

        const data = res.data.data;
        const newRound = {
            id: data.id,
            responses: data.responses,
        };
        dispatch(addRound(newRound));
    };

    const endBattle = async () => {
        if (!battle) return;

        try {
            await api.patch(`/premium/battles/${battle.id}/end`);
            setEnded(true);
        } catch (error) {
            console.error('Failed to end battle:', error);
        }
    };

    return {
        battle,
        ended,
        loadingRound,
        fetchBattle,
        createRound,
        endBattle,
    };
};
