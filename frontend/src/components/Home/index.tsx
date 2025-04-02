import { PoemForm } from "../PoemForm";
import { PoemList } from "../PoemList";
import { api } from '../../services/api.ts';
import { useEffect, useState } from "react";
import { PoemData } from "../interfaces/PoemData.ts";

export function Home() {

    const [poems, setPoems] = useState<PoemData[]>([]);

    async function getPoems() {
        try {
            const poemsAPI = await api.get('/api/poem');
            setPoems(poemsAPI.data);
        } catch (error) {
            console.error("Erro ao buscar poemas:", error);
        }
    }

    useEffect(() => {
        getPoems();
    }, []);

    return (
        <div className=" flex items-center justify-center flex-col min-h-screen min-w-screen">
            <PoemForm getPoems={getPoems} />
            <PoemList poems={poems} />
        </div>
    )
}