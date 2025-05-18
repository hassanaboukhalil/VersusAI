'use client';

import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LineChart,
    Line,
    TooltipProps,
} from 'recharts';
import { motion } from 'framer-motion';
import React from 'react';

interface ChartDataItem extends Record<string, string | number> {
    name: string;
}

const TooltipCard = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-white/20 bg-black px-3 py-2 text-sm">
            <p className="font-semibold text-primary">{label}</p>
            {payload.map((p) => (
                <p key={p.dataKey} className="flex items-center gap-2" style={{ color: p.color }}>
                    <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: p.color }}
                    />
                    {p.name}: {p.value}
                </p>
            ))}
        </div>
    );
};

type Props = {
    data: ChartDataItem[];
    modelNames: string[];
    getColor: (index: number) => string;
};

const LineBattleChart: React.FC<Props> = ({ data, modelNames, getColor }) => {
    return (
        <motion.div
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 70 }}
        >
            <h4 className="mb-5 text-xl font-semibold text-white">Response Time per Round</h4>

            <ResponsiveContainer width="100%" height={420}>
                <LineChart data={data} margin={{ right: 24 }}>
                    <CartesianGrid stroke="#4b5563" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#d1d5db" fontSize={12} />
                    <YAxis stroke="#d1d5db" fontSize={12} />
                    <Tooltip content={<TooltipCard />} cursor={{ fill: 'transparent' }} />
                    <Legend />
                    {modelNames.map((name, i) => (
                        <Line
                            key={name}
                            type="monotone"
                            dataKey={`${name}_response`}
                            name={`Response – ${name}`}
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
        </motion.div>
    );
};

export default LineBattleChart;
