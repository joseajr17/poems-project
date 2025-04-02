import { IoBook } from "react-icons/io5";

export function Header() {
    return (
        <header className="bg-gray-800 text-white px-10 py-8 relative flex justify-between items-center w-full">

            <a href="/" className="flex gap-2 items-center text-xl font-bold hover:text-sky-500">
                <IoBook />Acervo do Poeta Severino C. de Albuquerque
            </a>
            <nav className="flex gap-10">
                <a href="/#about" className="hover:text-sky-500 hover:underline">Sobre</a>
                <a href="/#photos" className="hover:text-sky-500 hover:underline">Fotos</a>
                <a href="/#poemList" className="hover:text-sky-500 hover:underline">Poemas</a>
                <a href="/admin" className="hover:text-sky-500 hover:underline">Admin</a>
            </nav>
        </header>
    );
}