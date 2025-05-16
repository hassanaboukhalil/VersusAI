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
