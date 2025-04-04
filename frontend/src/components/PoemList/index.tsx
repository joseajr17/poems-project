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

type PoemListProps = {
    poems: PoemData[];
};

export function PoemList({ poems }: PoemListProps) {

    const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);

    return (
        <section className="flex flex-col border m-2 p-2 h-screen gap-4 w-full " id="poemList">
            <div className="flex flex-col items-center gap-2">
                <h1 className='text-xl font-bold text-gray-900 opacity-50 hover:text-sky-500 hover:opacity-100'>Galeria de Poemas</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center items-start">
                {poems.map(poem => (
                    <Card key={poem.id} className="flex flex-col min-w-full transition-transform transform hover:scale-101 hover:shadow-lg border-gray-300 w-full h-[500px]">
                        <CardHeader className="gap-5">
                            <CardTitle >{poem.title}</CardTitle>
                            <CardDescription>Poema escrito por: {poem.author}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center flex-grow self-start">
                            <pre>{poem.content.split(/\n\s*\n/)[0]}</pre>

                            <button
                                className="flex self-end text-blue-500 hover:underline"
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
                ))}
            </div>
        </section>
    );
}

// 