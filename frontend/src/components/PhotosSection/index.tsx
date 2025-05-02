import { photosMock } from "./mock"
import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PhotoData } from "../interfaces/PhotoData";

type PhotosSectionProps = {
    photos: PhotoData[];
    getPhotos: () => Promise<void>;
};

export function PhotosSection({ photos, getPhotos }: PhotosSectionProps) {

    const [selected, setSelected] = useState<string | null>(null);
    const [photoTitle, setPhotoTitle] = useState<string | null>(null);
    return (
        <section
            id="photos"
            className="flex flex-col justify-start items-center gap-4 w-full border min-h-screen p-4 sm:p-6 md:p-10 overflow-y-auto "
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className='text-xl sm:text-2xl font-bold text-gray-900 opacity-50 hover:text-sky-500 hover:opacity-100'>Galeria de Fotos</h1>
            </div>

            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 w-full max-w-7xl">
                {photosMock.map((photo, index) => (
                    <img
                        key={index}
                        src={photo.url}
                        alt={`Gallery ${index}`}
                        className="mb-4 w-full rounded-xl shadow-md hover:scale-[1.02] transition-transform break-inside-avoid cursor-pointer"
                        onClick={() => {
                            setSelected(photo.url);
                            setPhotoTitle(photo.title); // Segundo set
                        }}

                    />
                ))}
            </div>

            <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                <DialogContent className="max-w-3xl p-0">
                    {selected && (
                        <div>
                            <img
                                src={selected}
                                alt="Zoom"
                                className="w-full h-auto rounded-xl"
                            />
                            <div className="flex justify-center items-center my-2 text-md text-bold text-gray-900">
                                <h1>{photoTitle}</h1>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}