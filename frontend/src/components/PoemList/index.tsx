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
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center items-center m-2 p-2 border" id="poemList">
            {poems.map(poem => (
                <Card key={poem.id} className="flex flex-col min-w-full transition-transform transform hover:scale-101 hover:shadow-lg w-full h-[450px]">
                    <CardHeader>
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
                        Poema escrito em: {new Date(poem.date).toLocaleDateString()}
                    </CardFooter>
                </Card>

            ))}
        </section>
    );
}