'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../ui/button';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { useBattleForm } from '../../../hooks/useBattleForm';
import { createBattle } from '../../../app/api/battleApi';
import BattleTypeSelector from './BattleTypeSelector';
import AIModelSelector from './AIModelSelector';
import BattleSpecificFields from './BattleSpecificFields';

const CreateBattleDialog = ({ onSuccess }: { onSuccess: () => void }) => {
    const {
        formData,
        updateField,
        validateForm,
        getTitlePlaceholder,
        getDescriptionLabel,
        getDescriptionPlaceholder,
        prepareSubmitData,
    } = useBattleForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const submitData = prepareSubmitData();
            const res = await createBattle(submitData);

            if (res.success) {
                router.push(`/battles/${res.data.id}`);
                onSuccess();
            } else {
                toast.error('Failed to create battle');
            }
        } catch (err) {
            toast.error('Failed to create battle');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DialogContent className="bg-[#121212] text-white max-w-2xl max-h-[90%] overflow-y-scroll">
            <DialogHeader className="mb-4">
                <DialogTitle className="text-white text-xl text-center">
                    Create a New AI Battle
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-center">
                    Set up a head-to-head challenge between AIs
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
                <div>
                    <label className="text-lg block">Title</label>
                    <Input
                        value={formData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        placeholder={getTitlePlaceholder()}
                        className="mt-1"
                    />
                </div>

                <BattleTypeSelector
                    selectedType={formData.battleType}
                    onTypeChange={(type) => updateField('battleType', type)}
                />

                <AIModelSelector
                    model1={formData.aiModel1}
                    model2={formData.aiModel2}
                    onModel1Change={(value) => updateField('aiModel1', value)}
                    onModel2Change={(value) => updateField('aiModel2', value)}
                />

                <div>
                    <label className="text-lg block">Temperature</label>
                    <Input
                        value={formData.temperature}
                        type="number"
                        onChange={(e) => updateField('temperature', Number(e.target.value))}
                        placeholder="Enter temperature (from 0.0 to 1.5)"
                        className="mt-1"
                        min={0.0}
                        max={1.5}
                        step={0.1}
                    />
                </div>

                <BattleSpecificFields
                    formData={formData}
                    updateField={updateField}
                    getDescriptionLabel={getDescriptionLabel}
                    getDescriptionPlaceholder={getDescriptionPlaceholder}
                />

                <Button
                    onClick={handleSubmit}
                    variant="default"
                    className="w-full hover:opacity-90 transition flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    {loading && <Loader2 className="animate-spin w-4 h-4" />}
                    {loading ? 'Please wait...' : 'Start Battle'}
                </Button>
            </div>
        </DialogContent>
    );
};

export default CreateBattleDialog;
