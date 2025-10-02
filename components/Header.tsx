 // si tu es dans Next.js App Router

"use client";
import { useState } from "react";
import Link from "next/link";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Dictionnaire de traductions
  const translations = {
    fr: {
      home: "Accueil",
      about: "À propos",
      staff: "Témoignages",
      projects: "Réalisations",
      news: "Actualités",
      contact: "Contact",
      donate: "Faire un don",
      langLabel: "Français",
      flag: "🇫🇷",
    },
    en: {
      home: "Home",
      about: "About",
      staff: "Testimonials",
      projects: "Projects",
      news: "News",
      contact: "Contact",
      donate: "Donate",
      langLabel: "English",
      flag: "🇬🇧",
    },
    mg: {
      home: "Fandraisana",
      about: "Momban’ny",
      staff: "Vavolombelona",
      projects: "Tetikasa",
      news: "Vaovao",
      contact: "Fifandraisana",
      donate: "Fanomezana",
      langLabel: "Malagasy",
      flag: "🇲🇬",
    },
  };

  const t = translations[lang]; // traduction active

  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <nav className="mx-10 backdrop-blur-md bg-white/50 shadow-md rounded-xl px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-0">
          <img className="h-13" />
        </div>

        {/* Menu desktop */}
        <ul className="hidden font-bold md:flex space-x-4 text-lg text-gray-700 items-center">
          <li>
            <Link href="#home" className="hover:text-[#7c3b63] transition-colors duration-300">
              {t.home}
            </Link>
          </li>
          <li className="border-l border-gray-300 pl-4">
            <Link href="#about" className="hover:text-[#7c3b63] transition-colors duration-300">
              {t.about}
            </Link>
          </li>
          <li className="border-l border-gray-300 pl-4">
            <Link href="#staff" className="hover:text-[#7c3b63] transition-colors duration-300">
              {t.staff}
            </Link>
          </li>
          <li className="border-l border-gray-300 pl-4">
            <Link href="#projects" className="hover:text-[#7c3b63] transition-colors duration-300">
              {t.projects}
            </Link>
          </li>
          <li className="border-l border-gray-300 pl-4">
            <Link href="#projects" className="hover:text-[#7c3b63] transition-colors duration-300">
              {t.news}
            </Link>
          </li>
          <li className="border-l border-gray-300 pl-4">
            <Link href="#contact" className="hover:text-[#7c3b63] transition-colors duration-300">
              {t.contact}
            </Link>
          </li>

          {/* Bouton Faire un don */}
          <li className="border-l border-gray-300 pl-4">
            <Link href="/login">
              <button className="flex items-center bg-[#9b4b7c] hover:bg-[#7c3b63] cursor-pointer text-white font-bold px-4 py-2 rounded-lg shadow-md transition duration-300">
                <span>{t.donate}</span>
              </button>
            </Link>
          </li>

          {/* Sélecteur de langue */}
          <li className="relative border-l border-gray-300 pl-4">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-gray-700 hover:text-[#7c3b63] transition-colors duration-300"
            >
              {t.flag} ▾
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-16 bg-white shadow-md rounded-md py-2 z-50">
                <button
                  onClick={() => {
                    setLang("fr");
                    setLangOpen(false);
                  }}
                  className="block w-full text-center px-1 py-2 hover:bg-gray-100"
                >
                  🇫🇷
                </button>
                <button
                  onClick={() => {
                    setLang("en");
                    setLangOpen(false);
                  }}
                  className="block w-full text-center px-1 py-2 hover:bg-gray-100"
                >
                  🇬🇧
                </button>
                <button
                  onClick={() => {
                    setLang("mg");
                    setLangOpen(false);
                  }}
                  className="block w-full text-center px-1 py-2 hover:bg-gray-100"
                >
                  🇲🇬
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
                {t.home}
              </Link>
            </li>
            <li>
              <Link href="#about" onClick={() => setIsOpen(false)}>
                {t.about}
              </Link>
            </li>
            <li>
              <Link href="#staff" onClick={() => setIsOpen(false)}>
                {t.staff}
              </Link>
            </li>
            <li>
              <Link href="#projects" onClick={() => setIsOpen(false)}>
                {t.projects}
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={() => setIsOpen(false)}>
                {t.contact}
              </Link>
            </li>
            <li>
              <Link href="/login">
                <button className="flex items-center bg-[#9b4b7c] hover:bg-[#7c3b63] cursor-pointer text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300">
                  <span>{t.donate}</span>
                </button>
              </Link>
            </li>
            <li>
              {/* Sélecteur langue mobile */}
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="text-gray-700 hover:text-[#7c3b63] transition-colors duration-300"
              >
                {t.langLabel} ▾
              </button>
              {langOpen && (
                <div className="mt-2 bg-white shadow-md rounded-md py-2">
                  <button
                    onClick={() => {
                      setLang("fr");
                      setLangOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Français
                  </button>
                  <button
                    onClick={() => {
                      setLang("en");
                      setLangOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLang("mg");
                      setLangOpen(false);
                    }}
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
