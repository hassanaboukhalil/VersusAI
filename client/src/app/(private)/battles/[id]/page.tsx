'use client';

import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import Image from 'next/image';
import Section from '../../../../components/layout/Section';
import { Send, Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { getModelImage } from '../../../../utils/getModelImage';

const BattleDetailsPage = () => {
    // const { id } = useParams();
    const [ended, setEnded] = useState(false);

    const battle = useSelector((state: RootState) => state.battle.currentBattle);

    // "Battle": {
    //     "id": 19,
    //     "title": "Text Summarization Battle Between Two AIs",
    //     "type": "Text Summarization",
    //     "description": "Creating an LLM-powered mobile app begins by carefully selecting a strong and reliable open-source model like LLaMA, Mistral, or Gemma to fit the projects needs. Instead of building a model from scratch, using an existing base model saves significant time and resources while ensuring high-quality performance. To enable communication between the app and the model, a backend using FastAPI or Laravel is built, with the LLM being served through a system like Hugging Face Inference or Ollama. A custom AI agent is then developed on top of the model to manage conversation flow, add personality, and ensure a smooth, human-like interaction. Through the mobile app, users can chat directly with the AI in real time, creating a seamless experience similar to what ChatGPT provides, but fully customized to the projects vision.",
    //     "ai_model_1_name": "gemini-2.0-flash",
    //     "ai_model_2_name": "deepseek-prover-v2",
    //     "ai_model_1_response": "Developing an LLM-powered mobile app involves selecting a suitable open-source model (e.g., LLaMA, Mistral, or Gemma) and creating a backend with FastAPI or Laravel to serve it. A custom AI agent is built on top of the model to manage conversation flow and ensure natural interactions. The mobile app then enables users to engage in real-time conversations with the AI, providing a customized experience similar to ChatGPT.",
    //     "ai_model_2_response": "LLM-powered mobile apps start with choosing an open-source model (like LLaMA, Mistral, or Gemma) that suits the project's requirements. A backend (such as FastAPI or Laravel) is established to facilitate communication between the app and the model. After this, a custom AI agent is developed to manage conversations and ensure a smooth, human-like interaction. Users can then chat with the AI through the app in real-time, providing an experience akin to ChatGPT but tailored to the project's specific needs and personality."
    // }

    if (!battle) {
        return (
            <Section className="bg-background text-white px-6 py-10 mx-auto">
                <p className="text-center text-gray-400">Battle not found. Please try again.</p>
            </Section>
        );
    }

    return (
        <Section className="bg-background text-white px-6 py-10 mx-auto">
            <h1 className="text-2xl font-bold">{battle.title}</h1>
            <p className="mt-2 text-primary">{battle.type}</p>
            <p className="text-gray-300 mt-8 mb-6">{battle.description}</p>

            {/* Battle Rounds */}
            <div className="border border-lime-300 p-4 space-y-8 rounded-md bg-dark-white flex flex-col gap-2">
                {battle.rounds.map((round, i) => (
                    <div key={round.id} className="my-8">
                        <h3 className="text-lg font-semibold">Round {i + 1}</h3>

                        <div className="flex flex-col gap-4 mt-6">
                            {/* First AI Response */}
                            <div className="flex w-full items-start gap-2">
                                <Image
                                    src={getModelImage(round.responses[0].ai_model_name)}
                                    alt={round.responses[0].ai_model_name}
                                    width={50}
                                    height={50}
                                />
                                <div className="bg-white text-black p-3 rounded mb-2 text-sm max-w-[85%]">
                                    {round.responses[0].response_text}
                                </div>
                            </div>

                            {/* Second AI Response */}
                            <div className="flex w-full items-start justify-start flex-row-reverse gap-2">
                                <Image
                                    src={getModelImage(round.responses[1].ai_model_name)}
                                    alt={round.responses[1].ai_model_name}
                                    width={50}
                                    height={50}
                                />
                                <div className="bg-white text-black p-3 rounded mb-2 text-sm w-[85%]">
                                    {round.responses[1].response_text}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Buttons */}
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
                            {battle.ai_models.map((model) => (
                                <Button key={model.name} className="bg-primary text-black">
                                    <Star />
                                    Vote for {model.name}
                                </Button>
                            ))}
                        </div>
                        <p className="mt-4 text-gray-300">
                            {battle.ai_models[0].name}: {battle.ai_models[0].votes}{' '}
                            &nbsp;&nbsp;&nbsp;
                            {battle.ai_models[1].name}: {battle.ai_models[1].votes}
                        </p>
                    </div>

                    {/* Comments Section (static for now) */}
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
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Image
                                    src="/images/no-user-profile-pic.jpeg"
                                    alt="Jorge Katto"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <span className="font-semibold">Jorge Katto</span>
                            </div>
                            <p className="text-gray-400 text-sm">I liked the debate.</p>
                        </div>
                    </div>
                </>
            )}
        </Section>
    );
};

export default BattleDetailsPage;
