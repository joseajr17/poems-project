import { PoemData } from "../interfaces/PoemData.ts";
import { PoemCard } from "../PoemCard/index.tsx";

type PoemListProps = {
    poems: PoemData[];
    isAdmin?: boolean;
    getPoems: () => Promise<void>;
    loading?: boolean;
    errorLoading?: string | null;
};

export function PoemList({ poems, isAdmin = false, getPoems, loading, errorLoading }: PoemListProps) {
    if (loading) return <p>Carregando poemas...</p>;
    if (errorLoading) return <p>{errorLoading}</p>;
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

