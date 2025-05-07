'use client';

import BattleCard from './BattleCard';
import { Battle } from '../../../types/battle';

const BattleCards = ({ battles }: { battles: Battle[] }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {battles.map((battle) => (
                <BattleCard key={battle.id} battle={battle} />
            ))}
        </div>
    );
};

export default BattleCards;
