'use client';

import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setCurrentBattle } from '../../redux/slices/battleSlice';
import { AI_MODELS } from '../../constants/aiModels';
import { BATTLE_TYPES } from '../../constants/battleTypes';
import { Button } from '../ui/button';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import api from '../../lib/axios';
import Select from '../ui/Select';
import { useRouter } from 'next/navigation';

const CreateBattleDialog = ({ onSuccess }: { onSuccess: () => void }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedBattleType, setSelectedBattleType] = useState('');
    const [aiModel1, setAiModel1] = useState('');
    const [aiModel2, setAiModel2] = useState('');

    const router = useRouter();
    // const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (!title || !description || !selectedBattleType || !aiModel1 || !aiModel2) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            const res = await api.post('/premium/create-battle', {
                title,
                description,
                battle_type_name: selectedBattleType,
                ai_model_1_name: aiModel1,
                ai_model_2_name: aiModel2,
            });

            // const data = res.data.data;

            // const battle = {
            //     id: data.id,
            //     title: data.title,
            //     description: data.description,
            //     type: data.type,
            //     ai_models: [
            //         { name: data.ai_model_1_name, votes: 0 },
            //         { name: data.ai_model_2_name, votes: 0 },
            //     ],
            //     rounds: [
            //         {
            //             id: 1,
            //             responses: [
            //                 {
            //                     ai_model_name: data.ai_model_1_name,
            //                     response_text: data.ai_model_1_response,
            //                     votes: 0,
            //                 },
            //                 {
            //                     ai_model_name: data.ai_model_2_name,
            //                     response_text: data.ai_model_2_response,
            //                     votes: 0,
            //                 },
            //             ],
            //         },
            //     ],
            // };

            // dispatch(setCurrentBattle(battle));
            if (res.data.success) {
                const data = res.data.data;
                onSuccess();
                router.push(`/battles/${data.id}`);
            } else {
                toast.error('Failed to create battle');
            }
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
                        <Select
                            value={aiModel1}
                            onChange={setAiModel1}
                            options={AI_MODELS}
                            placeholder="Select AI Model A"
                        />
                        <Select
                            value={aiModel2}
                            onChange={setAiModel2}
                            options={AI_MODELS}
                            placeholder="Select AI Model B"
                        />
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
