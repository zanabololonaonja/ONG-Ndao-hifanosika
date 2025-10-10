"use client";

import { useState } from "react";

// Données multilingues
const publicationsData = {
  fr: [
    {
      title: "Mission et vision Objectifs principaux Les valeurs du projet (innovation, inclusion, impact social, durabilité…)",
      cover: "/LIVRE.png",
      pdf: "/brochure-mdf-complete.pdf",
    },
    {
      title: "Kids Preneurs est bien plus qu'un simple programme éducatif.",
      cover: "/bro5.jpg",
      pdf: "/brocom.pdf",
    },
    {
      title: "La Maison Digitale pour les Femmes représente notre engagement à briser les barrières numériques",
      cover: "/bro3.jpg",
      pdf: "/brochure3.pdf",
    },
    {
      title: "Le centre d'incubation NH Start-Up a été conçu comme un espace d'innovation et d'accompagnement destiné à soutenir les jeunes",
      cover: "/bro4.jpg",
      pdf: "/brochure4.pdf",
    },
  ],
  en: [
    {
      title: "Mission and vision Main objectives Project values (innovation, inclusion, social impact, sustainability...)",
      cover: "/LIVRE-en.png", // Image version anglaise
      pdf: "/brochure-mdf-complete-en.pdf",
    },
    {
      title: "Kids Preneurs is much more than just an educational program.",
      cover: "/bro5-en.jpg",
      pdf: "/brocom-en.pdf",
    },
    {
      title: "The Digital House for Women represents our commitment to breaking down digital barriers",
      cover: "/bro3-en.jpg",
      pdf: "/brochure3-en.pdf",
    },
    {
      title: "The NH Start-Up incubation center was designed as an innovation and support space to help young people",
      cover: "/bro4-en.jpg",
      pdf: "/brochure4-en.pdf",
    },
  ],
  mg: [
    {
      title: "Tanjona sy fahitana Tanjona lehibe Soatoavina tetikasa (vaovao, anjara, fiantraikany sosialy, faharetana...)",
      cover: "/LIVRE-mg.png", // Image version malgache
      pdf: "/brochure-mdf-complete-mg.pdf",
    },
    {
      title: "Kids Preneurs dia mihoatra ny programa fanabeazana fotsiny.",
      cover: "/bro5-mg.jpg",
      pdf: "/brocom-mg.pdf",
    },
    {
      title: "Ny Trano Digital ho an'ny Vehivavy dia maneho ny tolotray hanapaka ny sakana nomerika",
      cover: "/bro3-mg.jpg",
      pdf: "/brochure3-mg.pdf",
    },
    {
      title: "Ny foibem-pampiroboroboana NH Start-Up dia noforina ho toerana famoronana sy fanohanana hanampy ny tanora",
      cover: "/bro4-mg.jpg",
      pdf: "/brochure4-mg.pdf",
    },
  ],
};

// Textes multilingues pour la section
const sectionTexts = {
  fr: {
    backgroundText: "RÉALISATIONS",
    title: "Projets de nos",
    highlightedTitle: "réalisations",
    description: "À travers ces publications, mesurez la portée réelle de nos actions quotidiennes",
    button: "Voir toutes réalisations"
  },
  en: {
    backgroundText: "ACHIEVEMENTS",
    title: "Our projects of",
    highlightedTitle: "achievements",
    description: "Through these publications, measure the real scope of our daily actions",
    button: "See all achievements"
  },
  mg: {
    backgroundText: "ZAVATRA VITANTSIKA",
    title: "Tetik'asa momba ny",
    highlightedTitle: "zava-vitantsika",
    description: "Amin'ny alalan'ity publication ity, jereo ny tokan'ny asa ataontsika isan'andro",
    button: "Hitany zava-vitantsika rehetra"
  }
};

interface RealisationProps {
  lang: string;
}

export default function Realisation({ lang }: RealisationProps) {
  const [openPdf, setOpenPdf] = useState<string | null>(null);
  
  // Sélectionner les publications selon la langue
  const publications = publicationsData[lang as keyof typeof publicationsData] || publicationsData.fr;
  const texts = sectionTexts[lang as keyof typeof sectionTexts] || sectionTexts.fr;

  return (
    <section id="projects" className="min-h-screen p-8 bg-white flex flex-col items-center -top-266">
      {/* Titre style témoignage exact */}
      <div className="section-title no-auto-tiret">
        <span className="bg-text">{texts.backgroundText}</span>
        
        <div className="flex items-center justify-center gap-4" style={{ position: 'relative' }}>
          {/* Seul tiret - déplacé plus à gauche */}
          <div 
            style={{
              position: "absolute",
              top: "50%",
              left: "-22%",
              width: "66px",
              height: "5px",
              background: "#9b4b7c",
              transform: "translateY(-50%)"
            }}
          ></div>
          
          <h2 className="text-3xl font-bold ml-5">
            {texts.title} <span className="highlight">{texts.highlightedTitle}</span>
          </h2>
        </div>
        <p style={{ fontFamily: "bold", fontSize: "17px" }} className="mt-2">
          {texts.description}
        </p>
      </div>

      {/* Grid des couvertures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl mt-9">
        {publications.map((pub, idx) => (
          <div
            key={idx}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setOpenPdf(pub.pdf)}
          >
            <img
              src={pub.cover}
              alt={pub.title}
              className="w-full h-[350px] object-cover rounded shadow-lg"
            />
            <p className="mt-2 text-center font-semibold">{pub.title}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button className="bg-[#9b4b7c] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#7a3a62] transition-all duration-300 shadow-md hover:shadow-lg border border-[#9b4b7c]/30">
          {texts.button}
        </button>
      </div>

      {/* Modal PDF */}
      {openPdf && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-[900px] h-[600px] bg-white rounded shadow-xl flex flex-col">
            <button
              onClick={() => setOpenPdf(null)}
              className="absolute top-2 right-2 text-black text-2xl font-bold z-50"
            >
              ✖
            </button>
            <iframe
              src={openPdf}
              className="w-full h-full rounded"
              title="Brochure PDF"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}