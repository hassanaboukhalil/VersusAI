import { useState } from 'react';
import { createBattle } from '../app/api/battleApi'; // Import API call
import { toast } from 'sonner';

export type BattleFormData = {
    title: string;
    description: string;
    battleType: string;
    targetLanguage: string;
    programmingLanguage: string;
    debateTitle1: string;
    debateTitle2: string;
    aiModel1: string;
    aiModel2: string;
    temperature: number;
};

export const useBattleForm = () => {
    const [formData, setFormData] = useState<BattleFormData>({
        title: '',
        description: '',
        battleType: 'Text Summarization',
        targetLanguage: '',
        programmingLanguage: '',
        debateTitle1: '',
        debateTitle2: '',
        aiModel1: '',
        aiModel2: '',
        temperature: 0.5,
    });
    const [loading, setLoading] = useState(false);

    const updateField = (field: keyof BattleFormData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = (): boolean => {
        const {
            title,
            description,
            battleType,
            targetLanguage,
            programmingLanguage,
            debateTitle1,
            debateTitle2,
            aiModel1,
            aiModel2,
        } = formData;

        if (!title || !battleType || !aiModel1 || !aiModel2) {
            toast.error('Please fill all required fields');
            return false;
        }

        if (battleType !== 'Debate Challenge' && !description) {
            toast.error('Please enter the description');
            return false;
        }

        if (battleType === 'Text Translation' && !targetLanguage) {
            toast.error('Please enter the target language');
            return false;
        }

        if (battleType === 'Code Generation' && !programmingLanguage) {
            toast.error('Please select a programming language');
            return false;
        }

        if (battleType === 'Debate Challenge' && (!debateTitle1 || !debateTitle2)) {
            toast.error('Please enter both debate topics');
            return false;
        }

        return true;
    };

    const getTitlePlaceholder = () => {
        switch (formData.battleType) {
            case 'Text Summarization':
                return 'e.g., Summarize an article about AI advancements';
            case 'Text Translation':
                return 'e.g., Translate a technical document to French';
            case 'Code Generation':
                return 'e.g., Create a sorting algorithm implementation';
            case 'Debate Challenge':
                return 'e.g., AI Models Debate: Summer vs Winter';
            default:
                return 'Enter battle title';
        }
    };

    const getDescriptionLabel = () => {
        switch (formData.battleType) {
            case 'Text Summarization':
                return 'Text to Summarize';
            case 'Text Translation':
                return 'Text to Translate';
            case 'Code Generation':
                return 'Code Task Description';
            default:
                return 'Description';
        }
    };

    const getDescriptionPlaceholder = () => {
        switch (formData.battleType) {
            case 'Text Summarization':
                return 'Enter a paragraph to summarize...';
            case 'Text Translation':
                return 'Enter text to translate...';
            case 'Code Generation':
                return 'Describe what you want the code to do (e.g., "Create a function that sorts an array in ascending order")...';
            default:
                return 'Enter description';
        }
    };

    const prepareSubmitData = () => {
        const {
            battleType,
            description,
            debateTitle1,
            debateTitle2,
            targetLanguage,
            programmingLanguage,
            ...rest
        } = formData;

        return {
            ...rest,
            battle_type_name: battleType,
            description:
                battleType === 'Debate Challenge'
                    ? `${debateTitle1} vs ${debateTitle2}`
                    : description,
            target_language: battleType === 'Text Translation' ? targetLanguage : undefined,
            programming_language:
                battleType === 'Code Generation' ? programmingLanguage : undefined,
            debate_title_1: battleType === 'Debate Challenge' ? debateTitle1 : undefined,
            debate_title_2: battleType === 'Debate Challenge' ? debateTitle2 : undefined,
            ai_model_1_name: formData.aiModel1,
            ai_model_2_name: formData.aiModel2,
        };
    };

    const handleSubmit = async (onSuccess: () => void) => {
        // Validate the form fields before submission
        const validationError = validateForm();

        if (validationError) {
            return validationError; // Return error if validation fails
        }

        setLoading(true); // Set loading state
        try {
            // Prepare battle data
            const battleData = prepareSubmitData();

            // Call API to create battle
            const result = await createBattle(battleData);
            if (result.success) {
                onSuccess(); // Trigger success callback
                return null;
            }
            return 'Failed to create battle'; // Return failure message
        } catch (err) {
            console.error('Error creating battle', err);
            return 'Failed to create battle'; // Return error if API call fails
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return {
        formData,
        loading,
        setLoading,
        updateField,
        validateForm,
        getTitlePlaceholder,
        getDescriptionLabel,
        getDescriptionPlaceholder,
        prepareSubmitData,
        handleSubmit,
    };
};
