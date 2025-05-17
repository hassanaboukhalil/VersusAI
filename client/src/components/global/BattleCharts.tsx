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
};
