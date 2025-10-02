"use client";

import { useEffect, useRef } from "react";

// Traductions pour la section partenaire
const partnerTranslations = {
  fr: {
    title: "Notre partenaire",
    partners: [
      { id: 1, img: "/1-removebg-preview.png", alt: "Partenaire 1" },
      { id: 2, img: "/9-removebg-preview.png", alt: "Partenaire 2" },
      { id: 3, img: "/10-removebg-preview.png", alt: "Partenaire 3" },
      { id: 4, img: "/4-removebg-preview.png", alt: "Partenaire 4" },
      { id: 5, img: "/3-removebg-preview.png", alt: "Partenaire 5" },
      { id: 6, img: "/7-removebg-preview.png", alt: "Partenaire 6" },
      { id: 7, img: "/8-removebg-preview.png", alt: "Partenaire 7" },
      { id: 8, img: "/9-removebg-preview.png", alt: "Partenaire 8" },
      { id: 9, img: "/4-removebg-preview.png", alt: "Partenaire 9" },
      { id: 10, img: "/2-removebg-preview.png", alt: "Partenaire 10" }
    ]
  },
  en: {
    title: "Our partners",
    partners: [
      { id: 1, img: "/1-removebg-preview.png", alt: "Partner 1" },
      { id: 2, img: "/9-removebg-preview.png", alt: "Partner 2" },
      { id: 3, img: "/10-removebg-preview.png", alt: "Partner 3" },
      { id: 4, img: "/4-removebg-preview.png", alt: "Partner 4" },
      { id: 5, img: "/3-removebg-preview.png", alt: "Partner 5" },
      { id: 6, img: "/7-removebg-preview.png", alt: "Partner 6" },
      { id: 7, img: "/8-removebg-preview.png", alt: "Partner 7" },
      { id: 8, img: "/9-removebg-preview.png", alt: "Partner 8" },
      { id: 9, img: "/4-removebg-preview.png", alt: "Partner 9" },
      { id: 10, img: "/2-removebg-preview.png", alt: "Partner 10" }
    ]
  },
  mg: {
    title: "Ny mpiara-miasa",
    partners: [
      { id: 1, img: "/1-removebg-preview.png", alt: "Mpiara-miasa 1" },
      { id: 2, img: "/9-removebg-preview.png", alt: "Mpiara-miasa 2" },
      { id: 3, img: "/10-removebg-preview.png", alt: "Mpiara-miasa 3" },
      { id: 4, img: "/4-removebg-preview.png", alt: "Mpiara-miasa 4" },
      { id: 5, img: "/3-removebg-preview.png", alt: "Mpiara-miasa 5" },
      { id: 6, img: "/7-removebg-preview.png", alt: "Mpiara-miasa 6" },
      { id: 7, img: "/8-removebg-preview.png", alt: "Mpiara-miasa 7" },
      { id: 8, img: "/9-removebg-preview.png", alt: "Mpiara-miasa 8" },
      { id: 9, img: "/4-removebg-preview.png", alt: "Mpiara-miasa 9" },
      { id: 10, img: "/2-removebg-preview.png", alt: "Mpiara-miasa 10" }
    ]
  }
};

interface PartenaireProps {
  lang: string;
}

export default function Partenaire({ lang }: PartenaireProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Utiliser les traductions selon la langue sélectionnée
  const t = partnerTranslations[lang as keyof typeof partnerTranslations] || partnerTranslations.fr;

  // Animation du défilement automatique
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationId: number;
    let position = 0;
    const speed = 0.3;

    const animate = () => {
      position -= speed;
      
      // Réinitialiser la position quand tout le contenu a défilé
      if (position <= -marquee.scrollWidth / 2) {
        position = 0;
      }
      
      marquee.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      id="partners"
      className="relative min-h-screen p-8 bg-white overflow-hidden"
    >
      {/* PARTENAIRE */}
      <div className="relative" style={{ height: "300px" }}>
        {/* Overlay bleu et background plein écran horizontal */}
        <div className="absolute top-0 left-0 w-screen h-full bg-blue-500 opacity-30 z-0"></div>
        <div
          className="absolute top-0 -left-11 w-screen h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/partenaire.jpg')" }}
        ></div>

        {/* Overlay avec opacity */}
        <div className="absolute -right-9 -left-9 inset-0 bg-[#003366] opacity-77"></div>

        {/* Contenu partenaire */}
        <div className="relative z-10 text-white flex flex-col justify-start h-full max-w-6xl mx-auto">
          <div className="marquee pt-6">
            <br />
            <div className="marquee_header text-8xl font-bold text-center mb-6">
              {t.title}
            </div>
            <br /><br />
            
            <div className="marquee__inner flex overflow-x-hidden">
              <div 
                ref={marqueeRef}
                className="marquee__group flex space-x-6"
                style={{ willChange: 'transform' }}
              >
                {t.partners.map((partner) => (
                  <div 
                    key={partner.id}
                    className="w-32 h-16 flex items-center justify-center bg-white/70 border border-white rounded-md p-2 flex-shrink-0"
                  >
                    <img 
                      src={partner.img} 
                      alt={partner.alt} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                ))}
                {/* Duplication pour l'effet de boucle continu */}
                {t.partners.map((partner) => (
                  <div 
                    key={`${partner.id}-duplicate`}
                    className="w-32 h-16 flex items-center justify-center bg-white/70 border border-white rounded-md p-2 flex-shrink-0"
                  >
                    <img 
                      src={partner.img} 
                      alt={partner.alt} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee__group {
          animation: scroll 40s linear infinite;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
        
        .marquee__inner:hover .marquee__group {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}