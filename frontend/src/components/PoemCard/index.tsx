// src/components/PoemCard.tsx
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../ui/card";
import { PoemModal } from "../PoemModal";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { PoemData } from "../interfaces/PoemData";
import { api } from "@/services/api";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { PoemEdit } from "../PoemEdit";

type PoemCardProps = {
    poem: PoemData;
    isAdmin?: boolean;
    getPoems?: () => Promise<void>;
};

export function PoemCard({ poem, isAdmin = false, getPoems }: PoemCardProps) {
    const [open, setOpen] = useState(false);
    const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);

    async function deletePoem() {
        if (!confirm("Tem certeza que deseja excluir este poema?")) return;
        await api.delete(`/api/poem/${poem.id}`);
        getPoems?.();
    }

    const showModal = selectedPoemId !== null;
    return (
        <Card
            className={`flex flex-col transition-transform transform 
                hover:scale-101 hover:shadow-lg border-gray-300 ${isAdmin ? "min-w-full md:min-w-[350px] h-[250px]" : "w-full h-[500px]"
                }`}
        >
            <CardHeader className="gap-3">
                <CardTitle>
                    <button
                        className="text-blue-500 hover:underline cursor-pointer break-words text-lg"
                        onClick={() => setSelectedPoemId(poem.id)}
                    >
                        {poem.title}
                    </button>
                </CardTitle>
                {!isAdmin && (
                    <CardDescription>
                        Poema escrito por: {poem.author}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent className="flex flex-col flex-grow items-start self-start gap-2 overflow-hidden">
                {isAdmin ? (
                    showModal && (
                        <PoemModal
                            poemId={selectedPoemId}
                            isModalOpen={showModal}
                            setIsModalOpen={() => setSelectedPoemId(null)}
                        />
                    )
                ) : (
                    <>
                    {/* text-sm overflow-hidden text-ellipsis whitespace-pre-wrap max-h-[160px] */}
                        <pre className="text-sm">
                            {poem.content.split(/\n\s*\n/)[0]}
                        </pre>
                        <button
                            className="text-blue-500 hover:underline cursor-pointer"
                            onClick={() => setSelectedPoemId(poem.id)}
                        >
                            Ver mais
                        </button>

                        {showModal && (
                            <PoemModal
                                poemId={selectedPoemId}
                                isModalOpen={showModal}
                                setIsModalOpen={() => setSelectedPoemId(null)}
                            />
                        )}
                    </>
                )}
            </CardContent>

            <CardFooter className={`mt-auto ${isAdmin ? "justify-between" : "text-sm"}`}>
                {isAdmin ? (
                    <>
                        <div className="w-1/8 cursor-pointer">
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <a className="flex items-center gap-1 cursor-pointer hover:text-sky-500">
                                        <FaEdit className="w-full h-full hover:text-blue-500" />
                                    </a>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[455px]">
                                    <DialogTitle>Editar Poemas</DialogTitle>
                                    <PoemEdit closeDialog={() => setOpen(false)} poem={poem} getPoems={getPoems} />
                                </DialogContent>
                            </Dialog>

                        </div>

                        <div className="w-1/8 cursor-pointer" onClick={deletePoem}>
                            <MdDelete className="w-full h-full hover:text-red-500" />
                        </div>
                    </>
                ) : (
                    <span>
                        {new Date(poem.date).toLocaleDateString() !== "31/12/1969"
                            ? `Poema escrito em: ${new Date(poem.date).toLocaleDateString()}`
                            : "Poema sem data"}
                    </span>
                )}
            </CardFooter>
        </Card>
    );
}
