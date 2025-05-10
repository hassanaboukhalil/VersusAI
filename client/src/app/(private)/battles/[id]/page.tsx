'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import Image from 'next/image';

const BattleDetailsPage = () => {
    const { id } = useParams();
    const [ended, setEnded] = useState(false);

    // Mock battle data
    const battle = {
        title: 'Summarize a text about creating LLM',
        description:
            'Creating a Large Language Model (LLM)-powered application starts by selecting a suitable open-source base model that fits the project’s goals...',
        results: [
            {
                ai: 'Chatgpt',
                summary:
                    'To create an LLM-powered app, start by selecting a strong open-source model like LLaMA or Mistral...',
                subSummary:
                    'Building an AI chatbot application starts with choosing a suitable open-source LLM...',
                votes: 122,
            },
            {
                ai: 'Gemini',
                summary:
                    'Creating LLM-powered models begins by carefully selecting a strong and reliable open-source model...',
                subSummary:
                    'Developing an intelligent chat application powered by an LLM involves several important steps...',
                votes: 100,
            },
        ],
        comments: [
            {
                user: 'Jorge Katto',
                text: 'I liked the debate.',
                avatar: '/images/no-user-profile-pic.jpeg',
            },
            {
                user: 'Jorge Katto',
                text: 'Lorem ipsum dolor sit amet...',
                avatar: '/images/no-user-profile-pic.jpeg',
            },
        ],
    };

    return (
        <div className="bg-background text-white px-6 py-10 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">{battle.title}</h1>
            <p className="text-gray-300 mb-6">{battle.description}</p>

            <div className="border border-lime-300 p-4 space-y-8 rounded-md">
                {battle.results.map((res, i) => (
                    <div key={i}>
                        <h3 className="text-lg font-semibold mb-2">Result {i + 1}</h3>
                        <div className="bg-white text-black p-3 rounded mb-2 text-sm">
                            {res.summary}
                        </div>
                        <div className="bg-white text-black p-3 rounded text-sm">
                            {res.subSummary}
                        </div>
                        {ended && (
                            <div className="mt-2 flex justify-end">
                                <Button size="icon" className="bg-primary text-black">
                                    +
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {!ended ? (
                <div className="flex justify-center mt-6">
                    <Button className="bg-primary text-black" onClick={() => setEnded(true)}>
                        End Battle
                    </Button>
                </div>
            ) : (
                <>
                    {/* Votes Section */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2">Votes</h3>
                        <div className="flex items-center gap-4">
                            <Button className="bg-primary text-black">
                                Vote for {battle.results[0].ai}
                            </Button>
                            <Button className="bg-primary text-black">
                                Vote for {battle.results[1].ai}
                            </Button>
                        </div>
                        <p className="mt-4 text-gray-300">
                            {battle.results[0].ai}: {battle.results[0].votes} &nbsp;&nbsp;&nbsp;
                            {battle.results[1].ai}: {battle.results[1].votes}
                        </p>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-2">Write a comment</h3>
                        <Input
                            placeholder="Write a comment…"
                            className="mb-4 text-black bg-white"
                        />
                        <Button className="bg-primary text-black">Send</Button>
                    </div>

                    <div className="mt-6 space-y-4">
                        {battle.comments.map((c, i) => (
                            <div key={i}>
                                <div className="flex items-center gap-2 mb-1">
                                    <Image
                                        src={c.avatar}
                                        alt={c.user}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <span className="font-semibold">{c.user}</span>
                                </div>
                                <p className="text-gray-400 text-sm">{c.text}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default BattleDetailsPage;
