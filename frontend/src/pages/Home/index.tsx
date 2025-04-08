// import { PoemForm } from "../../components/PoemForm";
import { PoemList } from "../../components/PoemList";
import { api } from '../../services/api.ts';
import { useEffect, useState } from "react";
import { PoemData } from "../../components/interfaces/PoemData.ts";
import { About } from "../../components/About";
import { Header } from "@/components/Header/index.tsx";

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
        <>
            <Header />
            <div className=" flex items-center justify-center flex-col gap-5 mt-10 ">
                <About />
                {/* <PoemForm getPoems={getPoems} /> */}
                <PoemList poems={poems} />
            </div>
        </>
    )
}