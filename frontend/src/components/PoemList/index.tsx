import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

import { PoemModal } from "../PoemModal/index.tsx";
import { PoemData } from "../interfaces/PoemData.ts";
import { Button } from "../ui/button.tsx";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type PoemListProps = {
    poems: PoemData[];
    isAdmin?: boolean;
};

export function PoemList({ poems, isAdmin = false }: PoemListProps) {

    const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);

    return (
        <section className="flex flex-col border m-2 p-2 h-full gap-4 w-full" id="poemList">

            <div className="flex flex-col items-center gap-2">
                <h1 className='text-xl font-bold text-gray-900 opacity-50 hover:text-sky-500 hover:opacity-100'>{isAdmin ? "Gerenciador de Poemas" : "Galeria de Poemas"}</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center items-start">

                {isAdmin ? (
                    poems.map(poem => (
                        <Card key={poem.id} className="flex flex-col transition-transform transform hover:scale-101 hover:shadow-lg border-gray-300 w-full min-w-[350px] h-[250px]">

                            <CardHeader className="gap-5">
                                <CardTitle >
                                    <button
                                        className="flex self-end text-blue-500 cursor-pointer"
                                        onClick={() => setSelectedPoemId(poem.id)}
                                    >
                                        {poem.title}
                                    </button>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex items-center flex-grow self-start">

                                {selectedPoemId !== null && (
                                    <PoemModal
                                        poemId={selectedPoemId}
                                        isModalOpen={selectedPoemId !== null}
                                        setIsModalOpen={() => setSelectedPoemId(null)}
                                    />
                                )}
                            </CardContent>

                            <CardFooter className="mt-auto justify-between">
                                <div className="w-1/8 cursor-pointer ">
                                    <FaEdit className="w-full h-full" />
                                </div>

                                <div className="w-1/8 cursor-pointer">
                                    <MdDelete className="w-full h-full" />
                                </div>

                            </CardFooter>

                        </Card>
                    ))
                ) : (
                    poems.map(poem => (
                        <Card key={poem.id} className="flex flex-col min-w-full transition-transform transform hover:scale-101 hover:shadow-lg border-gray-300 w-full h-[500px]">

                            <CardHeader className="gap-5">
                                <CardTitle >{poem.title}</CardTitle>
                                <CardDescription>Poema escrito por: {poem.author}</CardDescription>
                            </CardHeader>

                            <CardContent className="flex items-center flex-grow self-start gap-2">
                                <pre>{poem.content.split(/\n\s*\n/)[0]}</pre>
                                <button
                                    className="flex self-end text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => setSelectedPoemId(poem.id)}
                                >
                                    Ver mais
                                </button>

                                {selectedPoemId !== null && (
                                    <PoemModal
                                        poemId={selectedPoemId}
                                        isModalOpen={selectedPoemId !== null}
                                        setIsModalOpen={() => setSelectedPoemId(null)}
                                    />
                                )}
                            </CardContent>

                            <CardFooter className="mt-auto">

                                {new Date(poem.date).toLocaleDateString() != "31/12/1969" ? `Poema escrito em: ${new Date(poem.date).toLocaleDateString()}` : "Poema sem data"}
                            </CardFooter>

                        </Card>
                    ))
                )}

            </div>
        </section>
    );
}

