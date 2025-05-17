'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import LineBattleChart from './LineBattleChart';
import BarBattleChart from './BarBattleChart';

type Response = {
    ai_model_name: string;
    response_time_ms: number;
    completion_tokens: number;
};

export type Round = { id: number; responses: Response[] };
type Props = { rounds: Round[] };

const COLORS = ['#22d3ee', '#c084fc'];

const makeChartData = (rounds: Round[]) => {
    return rounds.map((round, index) =>
        round.responses.reduce(
            (accumulator, currentResponse) => ({
                ...accumulator,
                name: `Round ${index + 1}`,
                [`${currentResponse.ai_model_name}_response`]: currentResponse.response_time_ms,
                [`${currentResponse.ai_model_name}_tokens`]: currentResponse.completion_tokens,
            }),
            {} as Record<string, string | number>
        )
    );
};

const BattleCharts: React.FC<Props> = ({ rounds }) => {
    const chartData = useMemo(() => makeChartData(rounds), [rounds]);
    const modelNames = rounds[0]?.responses.map((r) => r.ai_model_name) ?? [];
    const [hoveredRound, setHoveredRound] = useState<number | null>(null);

    const getColor = (i: number) => COLORS[i % COLORS.length];

    return (
        <motion.section
            className="my-14 space-y-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 60 }}
        >
            <h3 className="mb-6 text-3xl font-extrabold text-primary">Battle Statistics</h3>
            <LineBattleChart data={chartData} modelNames={modelNames} getColor={getColor} />
            <BarBattleChart
                data={chartData}
                modelNames={modelNames}
                getColor={getColor}
                hoveredRound={hoveredRound}
                setHoveredRound={setHoveredRound}
            />
        </motion.section>
    );
};

export default BattleCharts;
