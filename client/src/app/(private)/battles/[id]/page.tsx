'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Section from '../../../../components/layout/Section';
import { Skeleton } from '../../../../components/ui/Skeleton';
import { useBattleDetails } from '../../../../hooks/useBattleDetails';
import { useBattleVoting } from '../../../../hooks/useBattleVoting';
import BattleHeader from '../../../../components/pages-components/battle-details/BattleHeader';
import BattleRounds from '../../../../components/pages-components/battle-details/BattleRounds';
import BattleControls from '../../../../components/pages-components/battle-details/BattleControls';
import BattleVoting from '../../../../components/pages-components/battle-details/BattleVoting';
import BattleCharts from '../../../../components/pages-components/battle-details/BattleCharts';
import BattleComments from '../../../../components/pages-components/battle-details/BattleComments';

const BattleDetailsPage = () => {
    const { id } = useParams();
    const { battle, ended, loadingRound, fetchBattle, createRound, endBattle } = useBattleDetails(
        id as string
    );
    const { loadingVote, hasVoted, votedModel, vote, unvote } = useBattleVoting(battle);

    useEffect(() => {
        fetchBattle();
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!battle) {
        return (
            <Section className="bg-background text-white px-6 py-10 mx-auto min-h-screen">
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
            <BattleHeader battle={battle} />

            <BattleRounds battle={battle} />

            {!ended ? (
                <BattleControls
                    battle={battle}
                    loadingRound={loadingRound}
                    onCreateRound={createRound}
                    onEndBattle={endBattle}
                />
            ) : (
                <>
                    <BattleCharts rounds={battle.rounds} />

                    <BattleVoting
                        battle={battle}
                        hasVoted={hasVoted}
                        votedModel={votedModel}
                        loadingVote={loadingVote}
                        onVote={vote}
                        onUnvote={unvote}
                    />

                    <BattleComments battle={battle} />
                </>
            )}
        </Section>
    );
};

export default BattleDetailsPage;
