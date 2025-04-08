import { PoemData } from "@/components/interfaces/PoemData";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export function usePoems() {

    const [poems, setPoems] = useState<PoemData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    async function getPoems() {
        try {
            setLoading(true);
            const poemsAPI = await api.get("/api/poem");
            setPoems(poemsAPI.data);
        } catch (error) {
            console.error("Erro ao buscar poemas: ", error);
            setError("Erro ao buscar poemas");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPoems();
    }, []);

    return { poems, loading, error, getPoems };
}