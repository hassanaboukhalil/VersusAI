'use client';

import { useEffect, useState } from 'react';
import {
    fetchBattlesStart,
    fetchBattlesSuccess,
    fetchBattlesFailure,
    setFilter,
    setSortBy,
} from '../../../redux/slices/exploreSlice';
import { selectFilteredBattles } from '../../../redux/selectors/exploreSelectors';
import api from '../../../lib/axios';
import BattleCards from './BattleCards';
import { Input } from '../../../components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import SearchableSelect from '../../ui/SearchableSelect';
// import { AiModel } from '../../../types/battle';

interface AIModel {
    id: number;
    provider_name: string;
    model_name: string;
    logo_url: string;
    votes_count: number;
}

// interface FormattedAIModel {
//     value: string;
//     label: string;
//     logo: string;
//     votes: number;
// }

const FiltersAndCards = () => {
    const [model, setModel] = useState('');
    const [aiModels, setAiModels] = useState<AIModel[]>([]);
    const dispatch = useDispatch();
    const battles = useSelector(selectFilteredBattles);
    const loading = useSelector((state: RootState) => state.explore.loading);

    // Fetch AI models
    useEffect(() => {
        api.get('/ai-models')
            .then((res) => {
                if (res.data.status === 'success' && Array.isArray(res.data.data)) {
                    setAiModels(res.data.data as AIModel[]);
                }
            })
            .catch((error) => console.error('Failed to fetch AI models:', error));
    }, []);

    // Fetch battles
    useEffect(() => {
        dispatch(fetchBattlesStart());
        api.get('/battles')
            .then((res) => {
                console.log('hiiiiiiiiiii');
                console.log(res.data.data);
                const battlesData = Array.isArray(res.data.data) ? res.data.data : [];
                dispatch(fetchBattlesSuccess(battlesData));
                console.log(battlesData);
            })
            .catch(() => dispatch(fetchBattlesFailure()));
    }, [dispatch]);

    const handleModelChange = (value: string) => {
        setModel(value);
        dispatch(setFilter({ key: 'aiName', value: value === 'Select AI Model' ? '' : value }));
    };

    return (
        <>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-10">
                <Input
                    type="text"
                    name="search"
                    placeholder="Search battles..."
                    className="w-[25rem]"
                    onChange={(e) => dispatch(setFilter({ key: 'search', value: e.target.value }))}
                />
                <select
                    className="bg-white rounded-md px-4 py-2 text-black"
                    aria-label="Filter by battle type"
                    onChange={(e) => {
                        const value = e.target.value;
                        dispatch(
                            setFilter({
                                key: 'battleType',
                                value: value === 'Battle Type' ? '' : value,
                            })
                        );
                    }}
                >
                    <option>Battle Type</option>
                    <option>Code Generation</option>
                    <option>Text Summarization</option>
                    <option>Text Translation</option>
                    <option>Debate Challenge</option>
                </select>

                <select
                    className="bg-white rounded-md px-4 py-2 text-black"
                    aria-label="Sort by"
                    onChange={(e) => {
                        const value = e.target.value;
                        dispatch(
                            setSortBy({
                                key: 'sortBy',
                                value: value.toLowerCase(),
                            })
                        );
                    }}
                >
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                </select>

                {/* <SearchableSelect
                    value={model}
                    onChange={handleModelChange}
                    options={aiModels}
                    placeholder="Select AI Model"
                    className="w-full md:w-[15rem]"
                /> */}
                <select
                    className="bg-white rounded-md px-4 py-2 text-black"
                    value={model}
                    onChange={(e) => handleModelChange(e.target.value)}
                >
                    <option value="">Select AI Model</option>
                    {aiModels.map((aiModel) => (
                        <option key={aiModel.model_name} value={aiModel.id}>
                            {aiModel.model_name}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className="text-center text-gray-400">Loading…</p>
            ) : (
                <BattleCards battles={battles} />
            )}
        </>
    );
};

export default FiltersAndCards;
