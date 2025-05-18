import { BATTLE_TYPES } from '../../../constants/battleTypes';
import { Button } from '../../ui/button';

interface BattleTypeSelectorProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
}

const BattleTypeSelector = ({ selectedType, onTypeChange }: BattleTypeSelectorProps) => {
    return (
        <div>
            <label className="text-lg mb-1 block">Choose the battle type</label>
            <div className="flex flex-wrap gap-2">
                {BATTLE_TYPES.map((type) => (
                    <Button
                        key={type}
                        type="button"
                        onClick={() => onTypeChange(type)}
                        className={`text-sm transition border ${
                            selectedType === type
                                ? 'bg-primary text-black border-primary'
                                : 'bg-[#2C2C2C] text-white border-[#DEFE01] hover:bg-[#dcfe0198]'
                        }`}
                    >
                        {type}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default BattleTypeSelector;
