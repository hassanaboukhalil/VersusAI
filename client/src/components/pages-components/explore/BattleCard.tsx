import Image from 'next/image';
import { Button } from '../../ui/button';
import { Battle } from '../../../types/battle';
import Link from 'next/link';

const BattleCard = ({ battle }: { battle: Battle }) => {
    return (
        <div className="bg-dark-white rounded-lg p-4 text-white border border-white/10 flex flex-col justify-between h-full gap-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/30 hover:border-primary/50 hover:-translate-y-1 hover:rotate-[0.5deg] hover:bg-gradient-to-br hover:from-dark-white hover:to-dark-white/90">
            <h3 className="text-primary text-xl font-semibold">{battle.title}</h3>

            <div className="w-full">
                <p className="text-base font-medium mt-6">
                    {battle.ai_model_1_name} vs {battle.ai_model_2_name}
                </p>

                <div className="text-sm text-gray-300 flex justify-between mt-4">
                    <div>
                        <div className="text-lg">Votes</div>
                        <div className="text-sm mt-2">
                            {battle.ai_model_1_name}: {battle.votes_ai_model_1}
                            <br />
                            {battle.ai_model_2_name}: {battle.votes_ai_model_2}
                        </div>
                    </div>
                    <div>
                        <span className="text-primary text-lg">{battle.type}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                        <Image
                            src={'/images/no-user-profile-pic.jpeg'}
                            alt={`${battle.user_first_name} ${battle.user_last_name}`}
                            width={35}
                            height={35}
                            className="rounded-full"
                        />
                        <span className="text-lg">
                            {battle.user_first_name} {battle.user_last_name}
                        </span>
                    </div>
                </div>
                <div className="flex w-full justify-between items-end mt-4">
                    <span className="text-sm text-white">{battle.created_at}</span>
                    <Link href={`/battles/${battle.id}`}>
                        <Button size="sm" className="bg-primary text-black">
                            View
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BattleCard;
