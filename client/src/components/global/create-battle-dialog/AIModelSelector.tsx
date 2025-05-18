import { AI_MODELS } from '../../../constants/aiModels';
import Select from '../../ui/Select';

interface AIModelSelectorProps {
    model1: string;
    model2: string;
    onModel1Change: (value: string) => void;
    onModel2Change: (value: string) => void;
}

const AIModelSelector = ({
    model1,
    model2,
    onModel1Change,
    onModel2Change,
}: AIModelSelectorProps) => {
    return (
        <div>
            <label className="text-lg mb-1 block">Choose AIs</label>
            <div className="flex gap-2">
                <Select
                    value={model1}
                    onChange={onModel1Change}
                    options={AI_MODELS}
                    placeholder="Select AI Model A"
                />
                <Select
                    value={model2}
                    onChange={onModel2Change}
                    options={AI_MODELS}
                    placeholder="Select AI Model B"
                />
            </div>
        </div>
    );
};

export default AIModelSelector;
