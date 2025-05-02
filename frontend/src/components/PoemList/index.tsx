import { PoemData } from "../interfaces/PoemData.ts";
import { PoemCard } from "../PoemCard/index.tsx";

import { useState } from "react";
import { usePoems } from "@/hooks/usePoems.ts";
import { PoemListHeader } from "../PoemListHeader/index.tsx";

type PoemListProps = {
    poems: PoemData[];
    isAdmin?: boolean;
    getPoems: () => Promise<void>;
    loading?: boolean;
    errorLoading?: string | null;
};

export function PoemList({ poems, isAdmin = false, getPoems, loading, errorLoading }: PoemListProps) {
    const [ordemCrescente, setOrdemCrescente] = useState(true);
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const { getFilteredPoems, filteredPoems } = usePoems();

    const usandoFiltro = startDate && endDate;
    const poemasParaExibir = usandoFiltro ? filteredPoems : poems;

    const sortedPoems = [...poemasParaExibir].sort((a, b) =>
        ordemCrescente
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    );

    if (loading) console.log("Carregando poemas...");
    if (errorLoading) return <p>{errorLoading}</p>;
    return (
        <section
            className="flex flex-col border m-2 p-2 h-full gap-4 w-full "
            id="poemList">

            <PoemListHeader isAdmin={isAdmin}
                ordemCrescente={ordemCrescente}
                setOrdemCrescente={setOrdemCrescente}
                open={open}
                setOpen={setOpen}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                getFilteredPoems={getFilteredPoems}
            />

            {sortedPoems.length !== 0 ? (
                <div className={`grid grid-cols-1 sm:grid-cols-2  
                    ${isAdmin ? "gap-10 justify-center items-start md-grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" : "md:grid-cols-3 lg:grid-cols-4  gap-4"}
                
                `}>
                    {sortedPoems.map(poem => (
                        <PoemCard
                            key={poem.id}
                            poem={poem}
                            isAdmin={isAdmin}
                            getPoems={getPoems}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                    <h1 className="text-gray-500 text-xl">Nenhum poema encontrado</h1>
                </div>)}
        </section>
    );
}

