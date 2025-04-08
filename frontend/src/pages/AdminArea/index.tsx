import { Header } from "@/components/Header";
import { PoemList } from "@/components/PoemList";
import { usePoems } from "@/hooks/usePoems";

export function AdminArea() {
    const { poems, loading, error } = usePoems();

    if (loading) return <p>Carregando poemas...</p>;
    if (error) return <p>{error}</p>;



    return (
        <>
            <Header isAdmin />
            <div className=" flex items-center justify-center flex-col gap-5 mt-10 ">
                <PoemList poems={poems} isAdmin />
            </div>
        </>
    );
}
