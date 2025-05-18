import Image from 'next/image';
import { getModelImage } from '../../../utils/getModelImage';
import CodeResponse from '../../global/CodeResponse';
import type { Battle } from '../../../types/battle';

interface BattleRoundsProps {
    battle: Battle;
}

const BattleRounds = ({ battle }: BattleRoundsProps) => {
    return (
        <div className="border border-lime-300 p-6 space-y-10 rounded-xl bg-white/5 shadow-md">
            {battle.rounds.map((round, i) => (
                <div key={`round-${round.id}-${i}`} className="space-y-6">
                    {battle.type !== 'Debate Challenge' && (
                        <h3 className="text-xl font-bold text-lime-300">Round {i + 1}</h3>
                    )}

                    {/* Analysis of the Round */}
                    <div className="flex flex-col lg:flex-row gap-6 bg-white/5 shadow-sm rounded-xl p-6 border border-lime-300">
                        {/* Prompt Tokens */}
                        {(battle.type !== 'Debate Challenge' ||
                            battle.type === 'Debate Challenge') && (
                            <div className="flex-1 bg-white/10 p-4 rounded-lg border border-white/10">
                                <h4 className="text-sm text-gray-200 font-semibold mb-2">
                                    Prompt Tokens
                                </h4>
                                {battle.type !== 'Debate Challenge' ? (
                                    <p className="text-sm text-gray-400">
                                        <span className="text-white">
                                            {round.responses[0].prompt_tokens}
                                        </span>
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-400">
                                            {round.responses[0].ai_model_name}:{' '}
                                            <span className="text-white">
                                                {round.responses[0].prompt_tokens}
                                            </span>
                                        </p>
                                        {round.responses[1] && (
                                            <p className="text-sm text-gray-400">
                                                {round.responses[1].ai_model_name}:{' '}
                                                <span className="text-white">
                                                    {round.responses[1].prompt_tokens}
                                                </span>
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {/* Response Time */}
                        <div className="flex-1 bg-white/10 p-4 rounded-lg border border-white/10">
                            <h4 className="text-sm text-gray-200 font-semibold mb-2">
                                Response Time
                            </h4>
                            <p className="text-sm text-gray-400">
                                {round.responses[0].ai_model_name}:{' '}
                                <span className="text-white">
                                    {round.responses[0].response_time_ms} ms
                                </span>
                            </p>
                            {round.responses[1] && (
                                <p className="text-sm text-gray-400">
                                    {round.responses[1].ai_model_name}:{' '}
                                    <span className="text-white">
                                        {round.responses[1].response_time_ms} ms
                                    </span>
                                </p>
                            )}
                        </div>

                        {/* Completion Tokens */}
                        <div className="flex-1 bg-white/10 p-4 rounded-lg border border-white/10">
                            <h4 className="text-sm text-gray-200 font-semibold mb-2">
                                Completion Tokens
                            </h4>
                            <p className="text-sm text-gray-400">
                                {round.responses[0].ai_model_name}:{' '}
                                <span className="text-white">
                                    {round.responses[0].completion_tokens}
                                </span>
                            </p>
                            {round.responses[1] && (
                                <p className="text-sm text-gray-400">
                                    {round.responses[1].ai_model_name}:{' '}
                                    <span className="text-white">
                                        {round.responses[1].completion_tokens}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* AI model responses */}
                    <div
                        className={`flex flex-col gap-6 ${battle.type === 'Debate Challenge' ? 'mt-0' : 'mt-4'}`}
                    >
                        {/* AI model 1 */}
                        {round.responses[0] && (
                            <div className="flex w-full items-start gap-4">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-xs text-center text-lime-200 bg-lime-800/20 px-2 py-1 rounded-full">
                                        {round.responses[0].ai_model_name}
                                    </div>
                                    <Image
                                        src={getModelImage(round.responses[0].ai_model_name)}
                                        alt={round.responses[0].ai_model_name}
                                        width={48}
                                        height={48}
                                        className="rounded-full border border-lime-300 shadow"
                                    />
                                </div>
                                {battle.type === 'Code Generation' ? (
                                    <div className="max-w-[85%] w-full">
                                        <CodeResponse
                                            code={round.responses[0].response_text}
                                            language={battle.programming_language || 'javascript'}
                                        />
                                    </div>
                                ) : (
                                    <div className="bg-white text-black p-4 rounded-lg text-sm max-w-[85%] shadow">
                                        {round.responses[0].response_text}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* AI model 2 */}
                        {round.responses[1] && (
                            <div className="flex w-full items-start justify-end gap-4">
                                {battle.type === 'Code Generation' ? (
                                    <div className="w-[85%]">
                                        <CodeResponse
                                            code={round.responses[1].response_text}
                                            language={battle.programming_language || 'javascript'}
                                        />
                                    </div>
                                ) : (
                                    <div className="bg-white text-black p-4 rounded-lg text-sm w-[85%] shadow">
                                        {round.responses[1].response_text}
                                    </div>
                                )}
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-xs text-center text-indigo-200 bg-indigo-800/20 px-2 py-1 rounded-full">
                                        {round.responses[1].ai_model_name}
                                    </div>
                                    <Image
                                        src={getModelImage(round.responses[1].ai_model_name)}
                                        alt={round.responses[1].ai_model_name}
                                        width={48}
                                        height={48}
                                        className="rounded-full border border-indigo-300 shadow"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BattleRounds;
