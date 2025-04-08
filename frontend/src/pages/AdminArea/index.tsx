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
                {/* <PoemForm getPoems={getPoems} /> */}
                <PoemList poems={poems} isAdmin/>

            </div>
        </>


    );
}

{/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold">Admin Area</h1>
            <p className="mt-4 text-gray-600">Welcome to the admin area!</p>
            <Button onClick={handleLogout}>SAIR</Button>
        </div> */}