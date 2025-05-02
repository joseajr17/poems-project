// import { PoemForm } from "../../components/PoemForm";
import { PoemList } from "../../components/PoemList";
import { About } from "../../components/About";
import { Header } from "@/components/Header/index.tsx";
import { usePoems } from "@/hooks/usePoems";
import { PhotosSection } from "@/components/PhotosSection";
import { usePhotos } from "@/hooks/usePhoto";

export function Home() {
    const { poems, loading, error, getPoems } = usePoems();
    const { photos, getPhotos } = usePhotos();

    return (
        <>
            <Header getPoems={getPoems} />
            <div className="flex flex-col items-center justify-center gap-5 mt-10 px-4 sm:px-6 md:px-10 w-full max-w-screen-xl mx-auto">
                <About />
                <PhotosSection photos={photos} getPhotos={getPhotos} />
                <PoemList poems={poems} getPoems={getPoems} loading={loading} errorLoading={error} />
            </div>
        </>

    )
}