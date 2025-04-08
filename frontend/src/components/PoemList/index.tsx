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

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { api } from "@/services/api.ts";
import { PoemCard } from "../PoemCard/index.tsx";

type PoemListProps = {
    poems: PoemData[];
    isAdmin?: boolean;
    getPoems: () => Promise<void>;
};

export function PoemList({ poems, isAdmin = false, getPoems }: PoemListProps) {

    const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);

    async function deleteTask(id: string) {
        await api.delete(`/api/poem${id}`);
        getPoems();
    }

    return (
        <section className="flex flex-col border m-2 p-2 h-full gap-4 w-full" id="poemList">

            <div className="flex flex-col items-center gap-2">
                <h1 className='text-xl font-bold text-gray-900 opacity-50 hover:text-sky-500 hover:opacity-100'>{isAdmin ? "Gerenciador de Poemas" : "Galeria de Poemas"}</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center items-start">

                {poems.map(poem => (
                    <PoemCard
                        key={poem.id}
                        poem={poem}
                        isAdmin={isAdmin}
                        getPoems={getPoems}
                    />
                ))}

            </div>
        </section>
    );
}

