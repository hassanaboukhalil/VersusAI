import { Input } from '../../ui/input';
import Select from '../../ui/Select';
import { PROGRAMMING_LANGUAGES } from '../../../constants/programmingLanguages';
import DebateTopicInputs from './DebateTopicInputs';
import { BattleFormData } from '../../../hooks/useBattleForm';

interface BattleSpecificFieldsProps {
    formData: BattleFormData;
    updateField: (field: keyof BattleFormData, value: string | number) => void;
    getDescriptionLabel: () => string;
    getDescriptionPlaceholder: () => string;
}

const BattleSpecificFields = ({
    formData,
    updateField,
    getDescriptionLabel,
    getDescriptionPlaceholder,
}: BattleSpecificFieldsProps) => {
    const { battleType } = formData;

    if (battleType === 'Text Translation') {
        return (
            <>
                <div>
                    <label className="text-lg block">Target Language</label>
                    <Input
                        value={formData.targetLanguage}
                        onChange={(e) => updateField('targetLanguage', e.target.value)}
                        placeholder="Enter target language (e.g., French)"
                        className="mt-1"
                    />
                </div>
                <div>
                    <label className="text-lg mb-1 block">Text to Translate</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        rows={6}
                        className="w-full rounded bg-white text-black px-3 py-2 text-sm"
                        placeholder="Enter text to translate..."
                    ></textarea>
                </div>
            </>
        );
    }

    if (battleType === 'Code Generation') {
        return (
            <>
                <div>
                    <label className="text-lg block">Programming Language</label>
                    <Select
                        value={formData.programmingLanguage}
                        onChange={(value) => updateField('programmingLanguage', value)}
                        options={PROGRAMMING_LANGUAGES}
                        placeholder="Select a programming language"
                    />
                </div>
                <div>
                    <label className="text-lg mb-1 block">Code Task Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        rows={6}
                        className="w-full rounded bg-white text-black px-3 py-2 text-sm"
                        placeholder="Describe what you want the code to do..."
                    ></textarea>
                </div>
            </>
        );
    }

    if (battleType === 'Debate Challenge') {
        return (
            <DebateTopicInputs
                topic1={formData.debateTitle1}
                topic2={formData.debateTitle2}
                onTopic1Change={(value) => updateField('debateTitle1', value)}
                onTopic2Change={(value) => updateField('debateTitle2', value)}
            />
        );
    }

    // Default case (Text Summarization)
    return (
        <div>
            <label className="text-lg mb-1 block">{getDescriptionLabel()}</label>
            <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={6}
                className="w-full rounded bg-white text-black px-3 py-2 text-sm"
                placeholder={getDescriptionPlaceholder()}
            ></textarea>
        </div>
    );
};

export default BattleSpecificFields;
