import Modal from "react-modal";
import { api } from '../../services/api.ts';
import { useEffect, useState } from "react";
import { PoemData } from "../interfaces/PoemData.ts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

Modal.setAppElement("#root");

type PoemModalProps = {
    poemId: string;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
};

export function PoemModal({ poemId, isModalOpen, setIsModalOpen }: PoemModalProps) {

    const [poemDetails, setPoemDetails] = useState<PoemData | null>(null);

    async function getPoemDetails(id: string) {
        const poemsAPI = await api.get(`/api/poem/${id}`);
        setPoemDetails(poemsAPI.data);
    }

    useEffect(() => {
        if (poemId) {
            getPoemDetails(poemId);
        }
    }, [poemId]);

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="bg-white p-5 w-96 h-9/10 overflow-auto "
            overlayClassName={`fixed inset-0 flex pt-10 justify-center visible ${isModalOpen ? "visible bg-black/20": "invisible"}`}
        >
            {poemDetails ? (
                <>
                    <Card className="flex flex-col min-w-full">
                        <CardHeader>
                            <CardTitle >{poemDetails.title}</CardTitle>
                            <CardDescription>Poema escrito por: {poemDetails.author}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow self-start">
                            <pre>{poemDetails.content}</pre>
                        </CardContent>
                        <CardFooter className="mt-auto flex flex-col">
                            Poema escrito em: {new Date(poemDetails.date).toLocaleDateString()}
                            <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                                Fechar
                            </button>
                        </CardFooter>
                    </Card>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </Modal>
    );

}