// import { PoemForm } from "../../components/PoemForm";
import { PoemList } from "../../components/PoemList";
import { About } from "../../components/About";
import { Header } from "@/components/Header/index.tsx";
import { usePoems } from "@/hooks/usePoems";

export function Home() {
    const { poems, loading, error, getPoems } = usePoems();
    return (
        <>
            <Header getPoems={ getPoems } />
            <div className="flex items-center justify-center flex-col gap-5 mt-10">
                <About />
                <PoemList poems={poems} getPoems={getPoems } loading={loading} errorLoading ={error} />
            </div>
        </>
    )
}