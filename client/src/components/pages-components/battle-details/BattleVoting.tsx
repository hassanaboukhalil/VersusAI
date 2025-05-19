import { Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';
import type { Battle } from '../../../types/battle';

interface BattleVotingProps {
    battle: Battle;
    hasVoted: boolean;
    votedModel: string;
    loadingVote: boolean;
    onVote: (modelName: string) => void;
    onUnvote: () => void;
}

const BattleVoting = ({
    battle,
    hasVoted,
    votedModel,
    loadingVote,
    onVote,
    onUnvote,
}: BattleVotingProps) => {
    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Votes</h3>
            <div className="flex items-center gap-4 text-right w-full">
                {hasVoted ? (
                    <Button
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={onUnvote}
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
                        <Button
                            key={model.name}
                            className="bg-primary text-black hover:opacity-90"
                            disabled={loadingVote}
                            onClick={() => onVote(model.name)}
                        >
                            {loadingVote ? (
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                            ) : (
                                <>Vote for {model.name}</>
                            )}
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
    );
};

export default BattleVoting;
