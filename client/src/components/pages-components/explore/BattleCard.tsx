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
        <div className="bg-dark-white rounded-lg p-4 text-white border border-white/10 flex flex-col justify-between h-full">
            <div>
                <h3 className="text-primary text-2xl font-semibold">{battle.title}</h3>
                <p className="text-base font-medium mt-6">
                    {battle.models[0]} vs {battle.models[1]}
                </p>

                <div className="text-sm text-gray-300 flex justify-between mt-4">
                    <div>
                        <div className="text-lg">Votes</div>
                        <div className="text-sm mt-2">
                            {battle.models[0]}: {battle.votes[battle.models[0]]}
                            <br />
                            {battle.models[1]}: {battle.votes[battle.models[1]]}
                        </div>
                    </div>
                    <div>
                        <span className="text-primary text-lg">{battle.type}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/images/no-user-profile-pic.jpeg"
                            alt={battle.user.name}
                            width={35}
                            height={35}
                            className="rounded-full"
                        />
                        <span className="text-lg">{battle.user.name}</span>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-between items-end mt-4">
                <span className="text-sm text-white">{battle.date}</span>
                <Button size="sm" className="bg-primary text-black">
                    View
                </Button>
            </div>
        </div>
    );
};
export default BattleCard;
