import { PoemData } from "@/components/interfaces/PoemData";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export function usePoems() {

    const [poems, setPoems] = useState<PoemData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredPoems, setFilteredPoems] = useState<PoemData[]>([]);

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

    async function getFilteredPoems(startDate?: string, endDate?: string) {
        try {
            setLoading(true);

            const params = new URLSearchParams();
            if (startDate) params.append("startDate", startDate);
            if (endDate) params.append("endDate", endDate);

            const poemsAPI = await api.get(`/api/poem/filter?${params.toString()}`);
            setFilteredPoems(poemsAPI.data);
        } catch (error) {
            console.error("Erro ao buscar poemas filtrados: ", error);
            setError("Erro ao buscar poemas filtrados");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPoems();
    }, []);

    return { poems, loading, error, getPoems, filteredPoems, getFilteredPoems };
}