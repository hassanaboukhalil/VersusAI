import Image from 'next/image';
import { Button } from '../../ui/button';

interface Battle {
    id: string;
    title: string;
    models: string[];
    votes: Record<string, number>;
    type: string;
    date: string;
    user: { name: string; avatar: string };
}

const BattleCard = ({ battle }: { battle: Battle }) => {
    return (
        <div className="bg-dark-white rounded-lg p-4 text-white border border-white/10">
            <h3 className="text-primary text-sm font-semibold mb-1">{battle.title}</h3>
            <p className="text-base font-medium">
                {battle.models[0]} vs {battle.models[1]}
            </p>

            <div className="text-sm text-gray-300 flex justify-between mt-1">
                <div>
                    <div>Votes</div>
                    <div className="text-xs">
                        {battle.models[0]}: {battle.votes[battle.models[0]]}
                        <br />
                        {battle.models[1]}: {battle.votes[battle.models[1]]}
                    </div>
                </div>
                <div>
                    <div>Battle Type</div>
                    <span className="text-primary">{battle.type}</span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                    <Image
                        src={battle.user.avatar}
                        alt={battle.user.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                    />
                    <span className="text-xs">{battle.user.name}</span>
                </div>
                <span className="text-xs text-gray-500">{battle.date}</span>
            </div>

            <div className="flex justify-end mt-4">
                <Button size="sm" className="bg-primary text-black">
                    View
                </Button>
            </div>
        </div>
    );
};
export default BattleCard;
