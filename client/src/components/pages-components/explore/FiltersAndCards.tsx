'use client';

import { useEffect } from 'react';
import {
    fetchBattlesStart,
    fetchBattlesSuccess,
    fetchBattlesFailure,
    setFilter,
} from '../../../redux/slices/exploreSlice';
import { selectFilteredBattles } from '../../../redux/selectors/exploreSelectors';
import api from '../../../lib/axios';
import BattleCards from './BattleCards';
import { Input } from '../../../components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const FiltersAndCards = () => {
    const dispatch = useDispatch();
    const battles = useSelector(selectFilteredBattles);
    const loading = useSelector((state: RootState) => state.explore.loading);

    useEffect(() => {
        dispatch(fetchBattlesStart());
        api.get('/battles')
            .then((res) => {
                dispatch(fetchBattlesSuccess(res.data.data));
            })
            .catch(() => dispatch(fetchBattlesFailure()));
    }, [dispatch]);
    return (
        <>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-10">
                <Input
                    type="text"
                    name="search"
                    placeholder="search"
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
                    aria-label="Filter by date"
                    onChange={(e) => {
                        const value = e.target.value;
                        dispatch(
                            setFilter({
                                key: 'dateRange',
                                value: value === 'Date' ? '' : value,
                            })
                        );
                    }}
                >
                    <option>Date</option>
                    <option>Today</option>
                    <option>This week</option>
                    <option>This month</option>
                </select>
                <select
                    className="bg-white rounded-md px-4 py-2 text-black"
                    aria-label="Filter by AI model"
                    onChange={(e) => {
                        const value = e.target.value;
                        dispatch(
                            setFilter({
                                key: 'aiName',
                                value: value === 'AI Name Model' ? '' : value,
                            })
                        );
                    }}
                >
                    <option>AI Model Name</option>
                    <option>GPT-4</option>
                    <option>Claude 3</option>
                    <option>Gemini</option>
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
