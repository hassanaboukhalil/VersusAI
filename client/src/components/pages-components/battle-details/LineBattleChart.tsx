'use client';

import React from 'react';
import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LineChart,
    Line,
} from 'recharts';
import TooltipCard from './TooltipCard';
import AnimatedCard from '../../ui/AnimatedCard';

interface ChartDataItem extends Record<string, string | number> {
    name: string;
}

type Props = {
    data: ChartDataItem[];
    modelNames: string[];
    getColor: (index: number) => string;
};

const LineBattleChart: React.FC<Props> = ({ data, modelNames, getColor }) => {
    return (
        <AnimatedCard>
            <h4 className="mb-5 text-xl font-semibold text-white">Response Time per Round</h4>

            <ResponsiveContainer width="100%" height={420}>
                <LineChart data={data} margin={{ right: 24 }}>
                    <CartesianGrid stroke="#4b5563" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#d1d5db" fontSize={12} />
                    <YAxis stroke="#d1d5db" fontSize={12} />
                    <Tooltip
                        content={<TooltipCard />}
                        cursor={{ fill: 'transparent' }}
                        wrapperStyle={{ zIndex: 100, outline: 'none' }}
                    />
                    <Legend />
                    {modelNames.map((name, i) => (
                        <Line
                            key={name}
                            type="monotone"
                            dataKey={`${name}_response`}
                            name={`Response - ${name}`}
                            stroke={getColor(i)}
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            isAnimationActive
                            animationDuration={800}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </AnimatedCard>
    );
};

export default LineBattleChart;
