import { Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';
import type { Battle } from '../../../types/battle';

interface BattleControlsProps {
    battle: Battle;
    loadingRound: boolean;
    onCreateRound: () => void;
    onEndBattle: () => void;
}

const BattleControls = ({
    battle,
    loadingRound,
    onCreateRound,
    onEndBattle,
}: BattleControlsProps) => {
    return (
        <div className="flex justify-start mt-6 gap-4">
            <Button
                onClick={onCreateRound}
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
            <Button variant="default" onClick={onEndBattle}>
                End Battle
            </Button>
        </div>
    );
};

export default BattleControls;
