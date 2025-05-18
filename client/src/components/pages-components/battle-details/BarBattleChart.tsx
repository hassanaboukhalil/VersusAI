'use client';

import React from 'react';
import {
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    LabelList,
    Cell,
} from 'recharts';
import TooltipCard from './TooltipCard';
import AnimatedCard from '../../ui/AnimatedCard';

interface ChartDataItem extends Record<string, string | number> {
    name: string;
}

interface ChartMouseEvent {
    activeTooltipIndex?: number;
}

// Custom label component for better control over label rendering
interface CustomLabelProps {
    x?: number;
    y?: number;
    width?: number;
    value?: number | null;
}

const CustomLabel = ({ x = 0, y = 0, width = 0, value }: CustomLabelProps) => {
    if (value === undefined || value === null) return null;

    return (
        <text
            x={x + width / 2}
            y={y - 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize="12"
            fontWeight="bold"
        >
            {value}
        </text>
    );
};

type Props = {
    data: ChartDataItem[];
    modelNames: string[];
    getColor: (index: number) => string;
    hoveredRound: number | null;
    setHoveredRound: (v: number | null) => void;
};

const BarBattleChart = ({ data, modelNames, getColor, hoveredRound, setHoveredRound }: Props) => {
    return (
        <AnimatedCard delay={0.15}>
            <h4 className="mb-5 text-xl font-semibold text-white">Completion Tokens per Round</h4>

            <ResponsiveContainer width="100%" height={420}>
                <BarChart
                    data={data}
                    margin={{ right: 32, top: 20 }}
                    barCategoryGap="20%"
                    barGap={6}
                    onMouseMove={(e: ChartMouseEvent) => {
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
                    <Tooltip
                        content={<TooltipCard />}
                        cursor={{ fill: 'transparent' }}
                        wrapperStyle={{ zIndex: 100, outline: 'none' }}
                    />
                    <Legend />

                    {modelNames.map((name, i) => (
                        <Bar
                            key={name}
                            dataKey={`${name}_tokens`}
                            name={`Tokens - ${name}`}
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
                            isAnimationActive={true}
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
                                formatter={(v: number | null) =>
                                    v !== undefined && v !== null ? v.toString() : ''
                                }
                                content={<CustomLabel />}
                                dy={-4}
                            />
                        </Bar>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </AnimatedCard>
    );
};

export default BarBattleChart;
