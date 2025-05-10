'use client';

import { useState } from 'react';
import { AI_MODELS } from '../../constants/aiModels';
import { BATTLE_TYPES } from '../../constants/battleTypes';
import { Button } from '../ui/button';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import api from '../../lib/axios';

const CreateBattleDialog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedBattleType, setSelectedBattleType] = useState('');
    const [aiModel1, setAiModel1] = useState('');
    const [aiModel2, setAiModel2] = useState('');

    const handleSubmit = async () => {
        if (!title || !description || !selectedBattleType || !aiModel1 || !aiModel2) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            await api.post('/premium/create-battle', {
                title,
                description,
                battle_type_name: selectedBattleType,
                ai_model_1_name: aiModel1,
                ai_model_2_name: aiModel2,
            });
            toast.success('Battle created successfully!');
        } catch (err) {
            toast.error('Failed to create battle');
            console.error(err);
        }
    };

    return (
        <DialogContent className="bg-[#121212] text-white max-w-2xl max-h-[90%] overflow-y-scroll">
            <DialogHeader className="mb-4">
                <DialogTitle className="text-white text-xl text-center">
                    Create a New AI Battle
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-center">
                    “Set up a head-to-head challenge between AIs”
                </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
                <div>
                    <label className="text-lg block">Title</label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Summarize a text about creating LLM"
                        className="mt-1"
                    />
                </div>

                <div>
                    <label className="text-lg mb-1 block">Choose the battle type</label>
                    <div className="flex flex-wrap gap-2">
                        {BATTLE_TYPES.map((type) => (
                            <Button
                                key={type}
                                type="button"
                                onClick={() => setSelectedBattleType(type)}
                                className={`text-sm transition border ${
                                    selectedBattleType === type
                                        ? 'bg-primary text-black border-primary'
                                        : 'bg-[#2C2C2C] text-white border-[#DEFE01] hover:bg-[#dcfe0198]'
                                }`}
                            >
                                {type}
                            </Button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-lg mb-1 block">Choose AIs</label>
                    <div className="flex gap-2">
                        <select
                            value={aiModel1}
                            onChange={(e) => setAiModel1(e.target.value)}
                            className="flex-1 rounded bg-white text-black px-2 py-1"
                        >
                            <option value="">Select AI Model A</option>
                            {AI_MODELS.map((model) => (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            ))}
                        </select>
                        <select
                            value={aiModel2}
                            onChange={(e) => setAiModel2(e.target.value)}
                            className="flex-1 rounded bg-white text-black px-2 py-1"
                        >
                            <option value="">Select AI Model B</option>
                            {AI_MODELS.map((model) => (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-lg mb-1 block">Text to Summarize</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        className="w-full rounded bg-white text-black px-3 py-2 text-sm"
                        placeholder="Enter a paragraph to summarize, translate, or debate..."
                    ></textarea>
                </div>

                <Button
                    onClick={handleSubmit}
                    variant="default"
                    className="w-full hover:opacity-90 transition"
                >
                    Start Battle
                </Button>
            </div>
        </DialogContent>
    );
};
export default CreateBattleDialog;
