import { AuthContext } from "@/context/authContext";
import { useContext, useState } from "react";
import { IoBook } from "react-icons/io5";
import { Link } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { PoemForm } from "@/components/PoemForm";

interface HeaderProps {
    isAdmin?: boolean;
    getPoems: () => Promise<void>;
}

export function Header({ isAdmin = false, getPoems }: HeaderProps) {
    const [open, setOpen] = useState(false);

    const { logout } = useContext(AuthContext);

    function handleLogout() {
        logout();
    }

    return (
        <header className="bg-gray-800 text-white px-10 py-10 relative flex justify-between items-center w-full">
            <Link
                to={isAdmin ? "/adminArea" : "/"}
                className="flex gap-2 items-center text-2xl font-bold hover:text-sky-500"
            >
                {isAdmin ? (
                    "Área Administrativa"
                ) : (
                    <>
                        <IoBook /> Acervo do Poeta Severino C. de Albuquerque
                    </>
                )}
            </Link>

            <nav className="flex gap-10">
                {isAdmin ? (
                    <>
                        <Link to="/" className="flex items-center hover:text-sky-500  gap-1">
                            <IoHomeOutline /> Home
                        </Link>
                        
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                    <a className="hover:text-sky-500 cursor-pointer flex items-center gap-1"> <IoIosAddCircleOutline /> Cadastrar poema</a>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[455px]">
                                    <DialogTitle>Cadastro de Poemas</DialogTitle>
                                    <PoemForm getPoems={getPoems ?? (() => Promise.resolve())} closeDialog={() => setOpen(false)} />
                                </DialogContent>
                            </Dialog>
                        <Link to="/logout" className="flex items-center hover:text-sky-500  gap-1" onClick={handleLogout}>
                            <IoLogOutOutline /> Sair
                        </Link>
                    </>
                ) : (
                    <>
                        <a href="#about" className="hover:text-sky-500">Sobre</a>
                        <a href="#photos" className="hover:text-sky-500">Fotos</a>
                        <a href="#poemList" className="hover:text-sky-500">Poemas</a>
                        <Link to="/login" className="hover:text-sky-500"> Admin
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}