import { PhotoData } from "@/components/interfaces/PhotoData";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export function usePhotos() {

    const [photos, setPhotos] = useState<PhotoData[]>([]);

    async function getPhotos() {
        try {
            const photosAPI = await api.get("api/photo");
            setPhotos(photosAPI.data);
        } catch (error) {
            console.log("Erro ao buscar Fotos: ", error);
        }
    }

    useEffect(() => {
            getPhotos();
        }, []);

    return { getPhotos, photos };

}