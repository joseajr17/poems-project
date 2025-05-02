import { AuthContext } from "@/context/authContext";
import { useContext, useState } from "react";
import { IoBook } from "react-icons/io5";
import { Link } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { PoemForm } from "@/components/PoemForm";

interface HeaderProps {
    isAdmin?: boolean;
    getPoems: () => Promise<void>;
}

export function Header({ isAdmin = false, getPoems }: HeaderProps) {
    const [open, setOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { logout } = useContext(AuthContext);

    function handleLogout() {
        logout();
    }

    return (
        <header className="bg-gray-800 text-white px-6 py-4 w-full shadow-md flex flex-col  justify-between md:flex-row">
            <div className="flex justify-between items-center">
                <Link
                    to={isAdmin ? "/adminArea" : "/"}
                    className="flex gap-2 items-center text-lg sm:text-2xl font-bold hover:text-sky-500"
                >
                    {isAdmin ? (
                        "Área Administrativa do Acervo"
                    ) : (
                        <>
                            <IoBook />
                            <span className="sm:hidden">Acervo de Severino Cavalcanti</span>
                            <span className="hidden sm:inline">
                                Acervo do Poeta Severino C. de Albuquerque
                            </span>
                        </>
                    )}
                </Link>

                <button
                    className="sm:hidden text-white text-2xl"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            <nav
                className={`${mobileMenuOpen ? "flex " : "hidden"
                    } flex-col items-center sm:flex sm:flex-row sm:items-center gap-4 sm:gap-10 mt-4 sm:mt-0`}
            >
                {isAdmin ? (
                    <>
                        <Link
                            to="/"
                            className="flex items-center hover:text-sky-500 gap-1"
                        >
                            <IoHomeOutline /> Home
                        </Link>

                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <a className="hover:text-sky-500 cursor-pointer flex items-center gap-1">
                                    <IoIosAddCircleOutline /> Cadastrar poema
                                </a>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[455px]">
                                <DialogTitle>Cadastro de Poemas</DialogTitle>
                                <PoemForm
                                    getPoems={getPoems ?? (() => Promise.resolve())}
                                    closeDialog={() => setOpen(false)}
                                />
                            </DialogContent>
                        </Dialog>

                        <Link
                            to="/logout"
                            className="flex items-center hover:text-sky-500 gap-1"
                            onClick={handleLogout}
                        >
                            <IoLogOutOutline /> Sair
                        </Link>
                    </>
                ) : (
                    <>
                        <a href="#about" className="hover:text-sky-500">
                            Sobre
                        </a>
                        <a href="#photos" className="hover:text-sky-500">
                            Fotos
                        </a>
                        <a href="#poemList" className="hover:text-sky-500">
                            Poemas
                        </a>
                        <Link to="/login" className="hover:text-sky-500">
                            Admin
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}