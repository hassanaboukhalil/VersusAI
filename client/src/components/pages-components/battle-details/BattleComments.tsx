import { Send } from 'lucide-react';
import { Input } from '../../ui/input';
import Image from 'next/image';
import type { Battle } from '../../../types/battle';

interface BattleCommentsProps {
    battle: Battle;
}

const BattleComments = ({ battle }: BattleCommentsProps) => {
    return (
        <>
            {/* Comment Box */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">Write a comment</h3>
                <div className="bg-white relative rounded-md flex items-center">
                    <Input
                        placeholder="Write a comment…"
                        className="text-black bg-white rounded-md m-0 h-[3rem]"
                    />
                    <Send color="black" className="absolute right-[8px]" />
                </div>
            </div>

            {/* Static Comment */}
            <div className="mt-6 space-y-4">
                <div className="bg-white/5 p-4 rounded-md border border-gray-600 shadow">
                    <div className="flex items-center gap-4 mb-3">
                        <Image
                            src={
                                battle?.user.profile_picture_url ||
                                '/images/no-user-profile-pic.jpeg'
                            }
                            alt={`${battle?.user.first_name} ${battle?.user.last_name}`}
                            width={40}
                            height={40}
                            className="rounded-full border border-white shadow-sm"
                        />
                        <div className="flex flex-col leading-tight">
                            <span className="font-semibold text-white text-sm">
                                {battle?.user.first_name} {battle?.user.last_name}
                            </span>
                            <span className="text-gray-400 text-xs mt-0.5">
                                @{battle?.user.username}
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-300">I liked the debate.</p>
                </div>
            </div>

            <div className="mt-8">
                <p className="text-gray-300">
                    Created by {battle?.user.first_name} {battle?.user.last_name}
                </p>
            </div>
        </>
    );
};

export default BattleComments;
