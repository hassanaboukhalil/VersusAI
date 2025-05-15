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
import { Loader2 } from 'lucide-react';
import { PROGRAMMING_LANGUAGES } from '../../constants/programmingLanguages';

const CreateBattleDialog = ({ onSuccess }: { onSuccess: () => void }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedBattleType, setSelectedBattleType] = useState('Text Summarization');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [programmingLanguage, setProgrammingLanguage] = useState('');
    const [debateTitle1, setDebateTitle1] = useState('');
    const [debateTitle2, setDebateTitle2] = useState('');
    const [aiModel1, setAiModel1] = useState('');
    const [aiModel2, setAiModel2] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    // const dispatch = useDispatch();

    const getTitlePlaceholder = () => {
        switch (selectedBattleType) {
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

    const handleSubmit = async () => {
        if (!title || !selectedBattleType || !aiModel1 || !aiModel2) {
            toast.error('Please fill all required fields');
            return;
        }

        if (selectedBattleType !== 'Debate Challenge' && !description) {
            toast.error('Please enter the description');
            return;
        }

        if (selectedBattleType === 'Text Translation' && !targetLanguage) {
            toast.error('Please enter the target language');
            return;
        }

        if (selectedBattleType === 'Code Generation' && !programmingLanguage) {
            toast.error('Please select a programming language');
            return;
        }

        if (selectedBattleType === 'Debate Challenge' && (!debateTitle1 || !debateTitle2)) {
            toast.error('Please enter both debate topics');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/premium/create-battle', {
                title,
                description:
                    selectedBattleType === 'Debate Challenge'
                        ? `${debateTitle1} vs ${debateTitle2}`
                        : description,
                battle_type_name: selectedBattleType,
                ai_model_1_name: aiModel1,
                ai_model_2_name: aiModel2,
                target_language:
                    selectedBattleType === 'Text Translation' ? targetLanguage : undefined,
                programming_language:
                    selectedBattleType === 'Code Generation' ? programmingLanguage : undefined,
                debate_title_1:
                    selectedBattleType === 'Debate Challenge' ? debateTitle1 : undefined,
                debate_title_2:
                    selectedBattleType === 'Debate Challenge' ? debateTitle2 : undefined,
            });

            if (res.data.success) {
                const data = res.data.data;
                router.push(`/battles/${data.id}`);
                onSuccess();
            } else {
                toast.error('Failed to create battle');
            }
        } catch (err) {
            toast.error('Failed to create battle');
            console.error(err);
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={getTitlePlaceholder()}
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

                {selectedBattleType === 'Text Translation' && (
                    <div>
                        <label className="text-lg block">Target Language</label>
                        <Input
                            value={targetLanguage}
                            onChange={(e) => setTargetLanguage(e.target.value)}
                            placeholder="Enter target language (e.g., French)"
                            className="mt-1"
                        />
                    </div>
                )}

                {selectedBattleType === 'Code Generation' && (
                    <div>
                        <label className="text-lg block">Programming Language</label>
                        <Select
                            value={programmingLanguage}
                            onChange={setProgrammingLanguage}
                            options={PROGRAMMING_LANGUAGES}
                            placeholder="Select a programming language"
                        />
                    </div>
                )}

                {selectedBattleType === 'Debate Challenge' && (
                    <div className="space-y-4">
                        <div>
                            <label className="text-lg block">First Debate Topic</label>
                            <Input
                                value={debateTitle1}
                                onChange={(e) => setDebateTitle1(e.target.value)}
                                placeholder="Enter first topic (e.g., Summer)"
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-lg block">Second Debate Topic</label>
                            <Input
                                value={debateTitle2}
                                onChange={(e) => setDebateTitle2(e.target.value)}
                                placeholder="Enter second topic (e.g., Winter)"
                                className="mt-1"
                            />
                        </div>
                    </div>
                )}

                {selectedBattleType !== 'Debate Challenge' && (
                    <div>
                        <label className="text-lg mb-1 block">
                            {selectedBattleType === 'Text Summarization' && 'Text to Summarize'}
                            {selectedBattleType === 'Text Translation' && 'Text to Translate'}
                            {selectedBattleType === 'Code Generation' && 'Code Task Description'}
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={6}
                            className="w-full rounded bg-white text-black px-3 py-2 text-sm"
                            placeholder={
                                selectedBattleType === 'Text Summarization'
                                    ? 'Enter a paragraph to summarize...'
                                    : selectedBattleType === 'Text Translation'
                                      ? 'Enter text to translate...'
                                      : 'Describe what you want the code to do (e.g., "Create a function that sorts an array in ascending order")...'
                            }
                        ></textarea>
                    </div>
                )}

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
