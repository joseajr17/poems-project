import { PoemForm } from "../PoemForm";
import { PoemList } from "../PoemList";
import { api } from '../../services/api.ts';
import { useEffect, useState } from "react";
import { PoemData } from "../interfaces/PoemData.ts";
import { About } from "../About/index.tsx";

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
        <div className=" flex items-center justify-center flex-col gap-5 mt-10 ">
            <About />
            {/* <PoemForm getPoems={getPoems} /> */}
            <PoemList poems={poems} />
        </div>
    )

}