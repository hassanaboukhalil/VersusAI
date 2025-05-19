import type { Battle } from '../../../types/battle';

interface BattleHeaderProps {
    battle: Battle;
}

const BattleHeader = ({ battle }: BattleHeaderProps) => {
    return (
        <>
            <h1 className="text-2xl font-bold">{battle.title}</h1>
            <p className="mt-2 text-primary">{battle.type}</p>
            <p className="text-gray-300 mt-6 mb-6">{battle.description}</p>

            {battle.type === 'Text Translation' && battle.target_language && (
                <p className="text-primary mb-6">
                    Target Language: <span className="text-white">{battle.target_language}</span>
                </p>
            )}

            {battle.type === 'Code Generation' && battle.programming_language && (
                <p className="text-primary mb-6">
                    Programming Language:{' '}
                    <span className="text-white">{battle.programming_language}</span>
                </p>
            )}

            {battle.type === 'Debate Challenge' &&
                battle.debate_title_1 &&
                battle.debate_title_2 && (
                    <div className="flex flex-col gap-2 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="text-primary">
                                AI Model 1 ({battle.ai_models[0].name}) argues for:
                            </span>
                            <span className="text-white font-medium">{battle.debate_title_1}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-primary">
                                AI Model 2 ({battle.ai_models[1].name}) argues for:
                            </span>
                            <span className="text-white font-medium">{battle.debate_title_2}</span>
                        </div>
                    </div>
                )}
        </>
    );
};

export default BattleHeader;
