import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

import { api } from '../../services/api.ts';
import { PoemData } from "../interfaces/PoemData.ts";

export function PoemList() {

    const [poems, setPoems] = useState<PoemData[]>([]);
    useEffect(() => {
        getPoems();
    }, []);

    async function getPoems() {
        const poemsAPI = await api.get('/api/poem');
        setPoems(poemsAPI.data);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-center m-2 p-2 border w-3/4">
            {poems.map(poem => (
                <div key={poem.id} className='transition-transform transform hover:scale-101 hover:shadow-lg w-full'>
                    <Card className="flex flex-col min-w-full ">
                        <CardHeader>
                            <CardTitle >{poem.title}</CardTitle>
                            <CardDescription>Poema escrito por: {poem.author}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow self-start">
                            <pre>{poem.content.split("\n").slice(0, 4).join("\n") + (poem.content.split("\n").length > 4 ? "..." : "")}</pre>

                            <div className="flex justify-end">
                                <button
                                    className="text-blue-500 hover:underline"
                                >
                                    Ver mais
                                </button>
                            </div>
                        </CardContent>
                        <CardFooter className="mt-auto">
                            Poema escrito em: {new Date(poem.date).toLocaleDateString()}
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
}