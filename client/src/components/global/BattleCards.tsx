'use client';

import BattleCard from './BattleCard';
import { Battle } from '../../types/battle';

const BattleCards = ({ battles }: { battles: Battle[] }) => {
    return battles.length != 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {battles.map((battle) => (
                <BattleCard key={battle.id} battle={battle} />
            ))}
        </div>
    ) : (
        <div className="w-full flex-center h-96">
            <h1 className="text-white text-3xl">No Battles Yet</h1>
        </div>
    );
};

export default BattleCards;
