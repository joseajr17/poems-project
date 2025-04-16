import { Header } from "@/components/Header";
import { PoemList } from "@/components/PoemList";
import { usePoems } from "@/hooks/usePoems";

export function AdminArea() {
    const { poems, loading, error, getPoems } = usePoems();

    if (loading) console.log("Carregando poemas...");
    if (error) return <p>{error}</p>;

    return (
        <>
            <Header isAdmin getPoems={getPoems} />
            <div className="flex items-center justify-center flex-col gap-5 mt-10">
                <PoemList poems={poems} isAdmin getPoems={getPoems} />
            </div>
        </>
    );
}
