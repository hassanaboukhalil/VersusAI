import { AI_MODELS } from '../../../constants/aiModels';
import SearchableSelect from '../../ui/SearchableSelect';

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
    // Filter out model1 from options for the second dropdown
    const model2Options = AI_MODELS.filter((model) => model !== model1);

    // Update model2 if it's the same as model1
    const handleModel1Change = (value: string) => {
        onModel1Change(value);
        if (value === model2) {
            onModel2Change('');
        }
    };

    return (
        <div>
            <label className="text-lg mb-1 block">Choose AIs</label>
            <div className="flex gap-2 w-full">
                <SearchableSelect
                    value={model1}
                    onChange={handleModel1Change}
                    options={AI_MODELS}
                    placeholder="Select AI Model A"
                    className="w-full"
                />
                <SearchableSelect
                    value={model2}
                    onChange={onModel2Change}
                    options={model2Options}
                    placeholder="Select AI Model B"
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default AIModelSelector;
