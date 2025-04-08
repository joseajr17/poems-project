import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { IoBook } from "react-icons/io5";
import { Link } from "react-router";
import { IoHomeOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

interface HeaderProps {
    isAdmin?: boolean;
}

export function Header({ isAdmin = false }: HeaderProps) {

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