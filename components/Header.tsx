"use client"; // si tu es dans Next.js App Router

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <nav className="mx-10 backdrop-blur-md bg-white/50 shadow-md rounded-xl px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img className="h-13" />
        </div>

        {/* Menu desktop */}
        <ul className="hidden font-bold md:flex space-x-6 text-lg text-gray-700 items-center">
          <li>
            <Link
              href="#home"
              className="hover:text-[#7c3b63] transition-colors duration-300"
            >
              Accueil
            </Link>
          </li>
          <li className="border-l border-gray-300 pl-4">
            <Link
              href="#about"
              className="hover:text-[#7c3b63] transition-colors duration-300"
            >
              À propos
            </Link>
          </li>
          <li className="border-l border-gray-300 pl-4">
            <Link
              href="#staff"
              className="hover:text-[#7c3b63] transition-colors duration-300"
            >
              Staff
            </Link>
          </li>
          <li className="border-l border-gray-300 pl-4">
            <Link
              href="#projects"
              className="hover:text-[#7c3b63] transition-colors duration-300"
            >
              Projets
            </Link>
          </li>
          <li className="border-l border-gray-300 pl-4">
            <Link
              href="#contact"
              className="hover:text-[#7c3b63] transition-colors duration-300"
            >
              Contact
            </Link>
          </li>

          {/* Bouton Faire un don */}
          <li className="border-l border-gray-300 pl-4">
            <Link href="/login">
              <button className="flex items-center bg-[#9b4b7c] hover:bg-[#7c3b63] cursor-pointer text-white font-bold px-4 py-2 rounded-lg shadow-md transition duration-300">
                <span>Faire un don</span>
              </button>
            </Link>
          </li>

          {/* Sélecteur de langue */}
          <li className="relative border-l border-gray-300 pl-4">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-gray-700 hover:text-[#7c3b63] transition-colors duration-300"
            >
              Français ▾
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md py-2 z-50">
                <button
                  onClick={() => setLangOpen(false)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  English
                </button>
                <button
                  onClick={() => setLangOpen(false)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Malagasy
                </button>
              </div>
            )}
          </li>
        </ul>

        {/* Hamburger bouton */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md rounded-xl mt-2 mx-10 p-4">
          <ul className="flex flex-col space-y-4 text-gray-700 font-semibold">
            <li>
              <Link href="#home" onClick={() => setIsOpen(false)}>
                Accueil
              </Link>
            </li>
            <li>
              <Link href="#about" onClick={() => setIsOpen(false)}>
                À propos
              </Link>
            </li>
            <li>
              <Link href="#staff" onClick={() => setIsOpen(false)}>
                Staff
              </Link>
            </li>
            <li>
              <Link href="#projects" onClick={() => setIsOpen(false)}>
                Projets
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/login">
                <button className="flex items-center bg-[#9b4b7c] hover:bg-[#7c3b63] cursor-pointer text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300">
                  <span>Faire un don</span>
                </button>
              </Link>
            </li>
            <li>
              {/* Sélecteur langue mobile */}
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="text-gray-700 hover:text-[#7c3b63] transition-colors duration-300"
              >
                Français ▾
              </button>
              {langOpen && (
                <div className="mt-2 bg-white shadow-md rounded-md py-2">
                  <button
                    onClick={() => setLangOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLangOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Malagasy
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Logo */}
      <img
        src="/logoremove.png"
        alt="Logo"
        className="h-24 fixed top-1 left-11"
      />
    </header>
  );
}
