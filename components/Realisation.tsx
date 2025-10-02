"use client";

import { useState } from "react";

// Exemple de données
const publications = [
  {
    title: "Water And Climate Change: A Humanitarian Crisis",
    cover: "/LIVRE.png", // première page de la brochure
    pdf: "/brochure-mdf-complete.pdf",          // version complète
  },
  {
    title: "SDG 6: Wash Humanitarian Action Matters",
    cover: "/bro1.jpg",
    pdf: "/brocom.pdf",
  },
  {
    title: "Water Access for Exiled People in the Northern French Coast",
    cover: "/brochure3-cover.jpg",
    pdf: "/brochure3.pdf",
  },
  {
    title: "2022 Water, Sanitation and Hygiene Barometer",
    cover: "/brochure4-cover.jpg",
    pdf: "/brochure4.pdf",
  },
];

export default function Realisation() {
  const [openPdf, setOpenPdf] = useState<string | null>(null);

  return (
    <section id="projects" className="min-h-screen p-8 bg-white flex flex-col items-center -top-266">
     {/* Titre style témoignage exact */}
<div className="section-title no-auto-tiret">
  <span className="bg-text">RÉALISATIONS</span>
  
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
      Projets de nos <span className="highlight">réalisations</span>
    </h2>
  </div>
  <p style={{ fontFamily: "bold", fontSize: "17px" }} className="mt-2">
    À travers ces publications, mesurez la portée réelle de nos actions quotidiennes
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
<div><button>Voir toutes les publications </button></div>
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
