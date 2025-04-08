// import { PoemForm } from "../../components/PoemForm";
import { PoemList } from "../../components/PoemList";
import { About } from "../../components/About";
import { Header } from "@/components/Header/index.tsx";
import { usePoems } from "@/hooks/usePoems";

export function Home() {
    const { poems, loading, error } = usePoems();

    if (loading) return <p>Carregando poemas...</p>;
    if (error) return <p>{error}</p>;

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