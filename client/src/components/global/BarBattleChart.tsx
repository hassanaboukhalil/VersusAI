'use client';

import React from 'react';

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

const BarBattleChart = () => {
    return <div>BarBattleChart</div>;
};

export default BarBattleChart;
