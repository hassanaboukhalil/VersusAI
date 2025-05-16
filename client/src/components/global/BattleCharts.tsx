// components/BattleCharts.tsx
'use client';

import React, { useMemo, useState } from 'react';
import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LineChart,
    Line,
    BarChart,
    Bar,
    LabelList,
    Cell,
} from 'recharts';
import { motion } from 'framer-motion';

/* ──────────────────────────────  CONSTANTS  ─────────────────────────────── */
const COLORS = ['#22d3ee', '#c084fc', '#facc15', '#fb7185', '#34d399', '#f97316'];

/* ────────────────────────────────  TYPES  ───────────────────────────────── */
type Response = {
    ai_model_name: string;
    response_time_ms: number;
    completion_tokens: number;
};
export type Round = { id: number; responses: Response[] };
type Props = { rounds: Round[] };

/* ───────────────────────────────  HELPERS  ──────────────────────────────── */
const makeChartData = (rounds: Round[]) =>
    rounds.map((r, i) =>
        r.responses.reduce(
            (acc, cur) => ({
                ...acc,
                name: `Round ${i + 1}`,
                [`${cur.ai_model_name}_response`]: cur.response_time_ms,
                [`${cur.ai_model_name}_tokens`]: cur.completion_tokens,
            }),
            {} as Record<string, string | number>
        )
    );
const color = (idx: number) => COLORS[idx % COLORS.length];

/* ───────────────────────────────  TOOLTIP  ──────────────────────────────── */
const TooltipCard = ({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: any[];
    label?: string;
}) =>
    !active || !payload?.length ? null : (
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

/* ───────────────────────────────  COMPONENT  ─────────────────────────────── */
const BattleCharts: React.FC<Props> = ({ rounds }) => {
    const data = useMemo(() => makeChartData(rounds), [rounds]);
    const modelNames = rounds[0]?.responses.map((r) => r.ai_model_name) ?? [];
    const [hoveredRound, setHoveredRound] = useState<number | null>(null);

    /* ───────── Reusable SVG gradients & glow filter ───────── */
    const svgs = (
        <defs>
            {modelNames.map((_, i) => (
                <linearGradient key={i} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color(i)} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={color(i)} stopOpacity={0.6} />
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
    );

    return (
        <section className="my-14 space-y-12">
            <h3 className="mb-6 text-3xl font-extrabold text-primary">Battle Statistics</h3>

            {/* ──────────────── Response Time (Line) ─────────────── */}
            <motion.div
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 70, damping: 15 }}
            >
                <h4 className="mb-5 text-xl font-semibold text-white">Response Time per Round</h4>

                <ResponsiveContainer width="100%" height={420}>
                    <LineChart data={data} margin={{ right: 24 }}>
                        {svgs}
                        <CartesianGrid stroke="#4b5563" strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#d1d5db" fontSize={12} />
                        <YAxis stroke="#d1d5db" fontSize={12} />
                        <Tooltip content={<TooltipCard />} cursor={{ fill: 'transparent' }} />
                        <Legend />
                        {modelNames.map((n, i) => (
                            <Line
                                key={n}
                                type="monotone"
                                dataKey={`${n}_response`}
                                name={`Response – ${n}`}
                                stroke={color(i)}
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

            {/* ─────────────── Completion Tokens (Bar) ───────────── */}
            <motion.div
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 14,
                    delay: 0.15,
                }}
            >
                <h4 className="mb-5 text-xl font-semibold text-white">
                    Completion Tokens per Round
                </h4>

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
                        {svgs}
                        <CartesianGrid stroke="#4b5563" strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#d1d5db" fontSize={12} />
                        <YAxis stroke="#d1d5db" fontSize={12} />
                        <Tooltip content={<TooltipCard />} cursor={{ fill: 'transparent' }} />
                        <Legend />

                        {modelNames.map((n, i) => (
                            <Bar
                                key={n}
                                dataKey={`${n}_tokens`}
                                name={`Tokens – ${n}`}
                                fill={`url(#grad-${i})`}
                                stroke={color(i)}
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
                                    dataKey={`${n}_tokens`}
                                    position="top"
                                    fill="#fff"
                                    formatter={(v: number) => v.toString()}
                                />
                            </Bar>
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </section>
    );
};

export default BattleCharts;
