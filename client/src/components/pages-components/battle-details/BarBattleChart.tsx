'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BarChart } from 'recharts';
import { Bar } from 'recharts';
import { LabelList } from 'recharts';
import { Cell } from 'recharts';

const TooltipCard = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-white/20 bg-black px-3 py-2 text-sm">
            <p className="font-semibold text-primary">{label}</p>
            {payload.map((p: any) => (
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
    data: any[];
    modelNames: string[];
    getColor: (index: number) => string;
    hoveredRound: number | null;
    setHoveredRound: (v: number | null) => void;
};

const BarBattleChart = ({ data, modelNames, getColor, hoveredRound, setHoveredRound }: Props) => {
    return (
        <motion.div
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 70, delay: 0.15 }}
        >
            <h4 className="mb-5 text-xl font-semibold text-white">Completion Tokens per Round</h4>

            <ResponsiveContainer width="100%" height={420}>
                <BarChart
                    data={data}
                    margin={{ right: 32 }}
                    barCategoryGap="20%"
                    barGap={6}
                    onMouseMove={(e: any) => {
                        if (e?.activeTooltipIndex !== undefined) {
                            setHoveredRound(e.activeTooltipIndex);
                        }
                    }}
                    onMouseLeave={() => setHoveredRound(null)}
                >
                    <defs>
                        {modelNames.map((_, i) => (
                            <linearGradient key={i} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={getColor(i)} stopOpacity={0.9} />
                                <stop offset="100%" stopColor={getColor(i)} stopOpacity={0.6} />
                            </linearGradient>
                        ))}
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <CartesianGrid stroke="#4b5563" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#d1d5db" fontSize={12} />
                    <YAxis stroke="#d1d5db" fontSize={12} />
                    <Tooltip content={<TooltipCard />} cursor={{ fill: 'transparent' }} />
                    <Legend />

                    {modelNames.map((name, i) => (
                        <Bar
                            key={name}
                            dataKey={`${name}_tokens`}
                            name={`Tokens – ${name}`}
                            fill={`url(#grad-${i})`}
                            stroke={getColor(i)}
                            radius={[6, 6, 0, 0]}
                            barSize={42}
                            animationDuration={700}
                            activeBar={{
                                style: {
                                    filter: 'url(#glow)',
                                    transform: 'translateY(-6px)',
                                },
                            }}
                        >
                            {data.map((_, idx) => (
                                <Cell
                                    key={idx}
                                    opacity={
                                        hoveredRound === null || hoveredRound === idx ? 1 : 0.35
                                    }
                                />
                            ))}
                            <LabelList
                                dataKey={`${name}_tokens`}
                                position="top"
                                fill="#fff"
                                formatter={(v: number) => v.toString()}
                            />
                        </Bar>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default BarBattleChart;
