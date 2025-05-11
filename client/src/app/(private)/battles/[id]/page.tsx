'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import Image from 'next/image';
import Section from '../../../../components/layout/Section';
import { Send, Star } from 'lucide-react';

const BattleDetailsPage = () => {
    const { id } = useParams();
    const [ended, setEnded] = useState(false);

    // Mock battle data
    const battle = {
        title: 'Summarize a text about creating LLM',
        description:
            'Creating a Large Language Model (LLM)-powered application starts by selecting a suitable open-source base model that fits the project’s goals...',
        rounds: [
            [
                {
                    ai: 'Chatgpt',
                    responseText:
                        'To create an LLM-powered app, start by selecting a strong open-source model like LLaMA or Mistral, To create an LLM-powered app, start by selecting a strong open-source model like LLaMA or Mistral, To create an LLM-powered app, start by selecting a strong open-source model like LLaMA or Mistral',
                    src: '/images/llms/openai.svg',
                },
                {
                    ai: 'Gemini',
                    responseText:
                        'Creating LLM-powered models begins by carefully selecting a strong and reliable open-source model...',
                    votes: 100,
                    src: '/images/llms/gemini.svg',
                },
            ],
            [
                {
                    ai: 'Chatgpt',
                    responseText:
                        'To create an LLM-powered app, start by selecting a strong open-source model like LLaMA or Mistral...',
                    votes: 122,
                    src: '/images/llms/openai.svg',
                },
                {
                    ai: 'Gemini',
                    responseText:
                        'Creating LLM-powered models begins by carefully selecting a strong and reliable open-source model...',
                    votes: 100,
                    src: '/images/llms/gemini.svg',
                },
            ],
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
        <Section className="bg-background text-white px-6 py-10 mx-auto">
            <h1 className="text-2xl font-bold">{battle.title}</h1>
            <p className="text-gray-300 mt-8 mb-6">{battle.description}</p>

            <div className="border border-lime-300 p-4 space-y-8 rounded-md bg-dark-white flex flex-col gap-2">
                {battle.rounds.map((round, i) => (
                    <div key={i} className="my-8">
                        <h3 className="text-lg font-semibold">Result {i + 1}</h3>

                        <div className="flex flex-col gap-4 mt-6">
                            <div className="flex w-full items-start gap-2">
                                <Image src={round[0].src} alt="ai model 1" width="50" height="50" />
                                <div className="bg-white text-black p-3 rounded mb-2 text-sm max-w-[85%]">
                                    {round[0].responseText}
                                </div>
                            </div>
                            <div className="flex w-full items-start justify-start flex-row-reverse gap-2">
                                <Image src={round[1].src} alt="ai model 1" width="50" height="50" />
                                <div className="bg-white text-black p-3 rounded mb-2 text-sm w-[85%]">
                                    {round[1].responseText}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {!ended ? (
                <div className="flex justify-start mt-6 gap-4">
                    <Button className="bg-[#2C2C2C] text-white border border-[#DEFE01] hover:bg-[#dcfe0198]">
                        Give another results
                    </Button>
                    <Button variant="default" onClick={() => setEnded(true)}>
                        End Battle
                    </Button>
                </div>
            ) : (
                <>
                    {/* Votes Section */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2">Votes</h3>
                        <div className="flex items-center gap-4 text-right">
                            <Button className="bg-primary text-black">
                                <Star />
                                Vote for Chatgpt
                            </Button>
                            <Button className="bg-primary text-black">
                                <Star fill="red" />
                                Vote for Gemini
                            </Button>
                        </div>
                        <p className="mt-4 text-gray-300">
                            Chatgpt: 123 &nbsp;&nbsp;&nbsp; Gemini: 134
                        </p>
                    </div>

                    {/* Comments Section */}
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
        </Section>
    );
};

export default BattleDetailsPage;
