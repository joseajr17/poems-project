import { PoemData } from "../interfaces/PoemData.ts";
import { PoemCard } from "../PoemCard/index.tsx";

import { FaArrowDownAZ } from "react-icons/fa6";
import { FaArrowUpAZ } from "react-icons/fa6";
import { useState } from "react";
import { Button } from "../ui/button.tsx";
import { CgOptions } from "react-icons/cg";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { FilterMenu } from "../FilterMenu/index.tsx";
import { DialogDescription } from "@radix-ui/react-dialog";
import { usePoems } from "@/hooks/usePoems.ts";

type PoemListProps = {
    poems: PoemData[];
    isAdmin?: boolean;
    getPoems: () => Promise<void>;
    loading?: boolean;
    errorLoading?: string | null;
};

export function PoemList({ poems, isAdmin = false, getPoems, loading, errorLoading }: PoemListProps) {
    const [ordemCrescente, setOrdemCrescente] = useState(true);
    const [sortByDate, setSortByDate] = useState(true);
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const { getFilteredPoems, filteredPoems } = usePoems();

    const usandoFiltro = startDate && endDate;
    const poemasParaExibir = usandoFiltro ? filteredPoems : poems;

    if (loading) return <p>Carregando poemas...</p>;
    if (errorLoading) return <p>{errorLoading}</p>;
    return (
        <section className="flex flex-col border m-2 p-2 h-full gap-4 w-full" id="poemList">

            <div className="relative flex items-center justify-center">
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-900 opacity-50 hover:text-sky-500 hover:opacity-100">
                    {isAdmin ? "Gerenciador de Poemas" : "Galeria de Poemas"}
                </h1>
                <div className="ml-auto flex justify-between items-center gap-3 mt-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="a-z"
                            checked={ordemCrescente}
                            onChange={(e) => setOrdemCrescente(e.target.checked)}
                            className="hidden peer"
                        />
                        <label
                            htmlFor="a-z"
                            className={`cursor-pointer px-4 py-2 rounded-md transition ${ordemCrescente
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 border-gray-300'
                                }`}
                        >
                            <FaArrowDownAZ />
                            {ordemCrescente}
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="a-z"
                            checked={!ordemCrescente}
                            onChange={(e) => setOrdemCrescente(e.target.checked)}
                            className="hidden peer"
                        />
                        <label
                            htmlFor="a-z"
                            className={`cursor-pointer px-4 py-2 rounded-md transition ${!ordemCrescente
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 border-gray-300'
                                }`}
                        >
                            <FaArrowUpAZ />
                            {!ordemCrescente}
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="sortByDate"
                            checked={sortByDate}
                            onChange={(e) => setSortByDate(e.target.checked)}
                            className="hidden peer"
                        />
                        <label
                            htmlFor="sortByDate"
                            className={`cursor-pointer px-4 py-2 rounded-md transition ${sortByDate
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 border-gray-300'
                                }`}
                        >
                            Mais recentes
                            {sortByDate}
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <Dialog
                            open={open}
                            onOpenChange={(isOpen) => {
                                if (!isOpen) {
                                    setStartDate("");
                                    setEndDate("");
                                }
                                setOpen(isOpen);
                            }}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    className="text-white hover:text-blue-500 cursor-pointer"
                                ><CgOptions />  Filtros</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[455px]">
                                <DialogTitle>Filtros de Poema</DialogTitle>
                                <DialogDescription>Use filtros para encontrar poemas.</DialogDescription>

                                <FilterMenu
                                    startDate={startDate}
                                    endDate={endDate}
                                    setStartDate={setStartDate}
                                    setEndDate={setEndDate}
                                    closeDialog={() => setOpen(false)}
                                    onApplyFilter={(startDate, endDate) => getFilteredPoems(startDate, endDate)}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>


            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center items-start">

                {ordemCrescente && sortByDate ?
                    poemasParaExibir
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map(poem => (
                            <PoemCard
                                key={poem.id}
                                poem={poem}
                                isAdmin={isAdmin}
                                getPoems={getPoems}
                            />
                        )) : poemasParaExibir
                            .sort((a, b) => b.title.localeCompare(a.title))
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            .map(poem => (
                                <PoemCard
                                    key={poem.id}
                                    poem={poem}
                                    isAdmin={isAdmin}
                                    getPoems={getPoems}
                                />
                            ))
                }

            </div>
        </section>
    );
}

