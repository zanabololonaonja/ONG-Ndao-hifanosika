"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Traductions pour la section témoignages
const testimonialsTranslations = {
  fr: {
    title: "TÉMOIGNAGES",
    mainTitle: "Témoignages de nos",
    highlighted: "bénéficiaires",
    subtitle: "À travers leurs mots, mesurez la portée réelle de nos actions quotidiennes",
    testimonials: [
      {
        text: "Grâce à Ndao hifanosika, mes enfants peuvent maintenant aller à l'école. C'est un rêve qui devient réalité.",
        img: "https://media.istockphoto.com/id/1407659288/fr/vectoriel/portrait-dune-jeune-femme-souriante-aux-cheveux-bruns-fluides-une-fille-en-t-shirt-blanc.jpg?s=612x612&w=0&k=20&c=YEM7lGkevVW59fTm8Ehnbl-e8QeTD3i7DaBueLOj-MA=",
        name: "Rakoto Marie",
        role: "Bénéficiaire du programme éducation",
      },
      {
        text: "Les formations en agriculture durable ont transformé ma ferme. Ma famille vit mieux maintenant.",
        img: "https://st5.depositphotos.com/92370522/78999/v/600/depositphotos_789993152-stock-illustration-business-man-avatar-cartoon-character.jpg",
        name: "Andry Jean",
        role: "Agriculteur, programme environnement",
      },
      {
        text: "Le centre de santé a sauvé la vie de mon bébé. Merci pour votre dévouement incroyable.",
        img: "https://st.depositphotos.com/66863552/56605/v/600/depositphotos_566052540-stock-illustration-colorful-simple-flat-vector-business.jpg",
        name: "Soa Hery",
        role: "Mère de famille",
      },
      {
        text: "Grâce aux ateliers, j'ai trouvé un emploi stable. Ma vie a changé.",
        img: "https://cdn-icons-png.flaticon.com/512/921/921071.png",
        name: "Koto Liva",
        role: "Jeune bénéficiaire",
      },
      {
        text: "Les aides alimentaires m'ont permis de nourrir ma famille pendant une période difficile.",
        img: "https://cdn-icons-png.flaticon.com/512/921/921087.png",
        name: "Fali Manana",
        role: "Père de famille",
      },
      {
        text: "J'ai appris à lire et écrire grâce au programme d'alphabétisation.",
        img: "https://cdn-icons-png.flaticon.com/512/921/921092.png",
        name: "Mihaja Mahefa",
        role: "Programme éducation",
      },
    ]
  },
  en: {
    title: "TESTIMONIALS",
    mainTitle: "Testimonials from our",
    highlighted: "beneficiaries",
    subtitle: "Through their words, measure the real impact of our daily actions",
    testimonials: [
      {
        text: "Thanks to Ndao hifanosika, my children can now go to school. It's a dream come true.",
        img: "https://media.istockphoto.com/id/1407659288/fr/vectoriel/portrait-dune-jeune-femme-souriante-aux-cheveux-bruns-fluides-une-fille-en-t-shirt-blanc.jpg?s=612x612&w=0&k=20&c=YEM7lGkevVW59fTm8Ehnbl-e8QeTD3i7DaBueLOj-MA=",
        name: "Rakoto Marie",
        role: "Education program beneficiary",
      },
      {
        text: "Sustainable agriculture training has transformed my farm. My family lives better now.",
        img: "https://st5.depositphotos.com/92370522/78999/v/600/depositphotos_789993152-stock-illustration-business-man-avatar-cartoon-character.jpg",
        name: "Andry Jean",
        role: "Farmer, environment program",
      },
      {
        text: "The health center saved my baby's life. Thank you for your incredible dedication.",
        img: "https://st.depositphotos.com/66863552/56605/v/600/depositphotos_566052540-stock-illustration-colorful-simple-flat-vector-business.jpg",
        name: "Soa Hery",
        role: "Mother",
      },
      {
        text: "Thanks to the workshops, I found a stable job. My life has changed.",
        img: "https://cdn-icons-png.flaticon.com/512/921/921071.png",
        name: "Koto Liva",
        role: "Young beneficiary",
      },
      {
        text: "Food assistance allowed me to feed my family during a difficult period.",
        img: "https://cdn-icons-png.flaticon.com/512/921/921087.png",
        name: "Fali Manana",
        role: "Father",
      },
      {
        text: "I learned to read and write thanks to the literacy program.",
        img: "https://cdn-icons-png.flaticon.com/512/921/921092.png",
        name: "Mihaja Mahefa",
        role: "Education program",
      },
    ]
  },
  mg: {
    title: "FANEHOAM-PINOANA",
    mainTitle: "Fanehoam-pinoana avy amin'ny",
    highlighted: "mpandray anjara",
    subtitle: "Amin'ny alalan'ny teniny, refeso ny vokatra tena izy amin'ny asa ataontsika isan'andro",
    testimonials: [
      {
        text: "Noho ny Ndao hifanosika, afaka mandeha any an-tsekoly izao ny zanako. Nofy iray no tanteraka.",
        img: "https://media.istockphoto.com/id/1407659288/fr/vectoriel/portrait-dune-jeune-femme-souriante-aux-cheveux-bruns-fluides-une-fille-en-t-shirt-blanc.jpg?s=612x612&w=0&k=20&c=YEM7lGkevVW59fTm8Ehnbl-e8QeTD3i7DaBueLOj-MA=",
        name: "Rakoto Marie",
        role: "Mpandray anjara tetikasa fanabeazana",
      },
      {
        text: "Ny fampiofanana momba ny fambolena maharitra no niova tanteraka ny tokoko. Miara-mahazo aina tsara kokoa ny ankohonako izao.",
        img: "https://st5.depositphotos.com/92370522/78999/v/600/depositphotos_789993152-stock-illustration-business-man-avatar-cartoon-character.jpg",
        name: "Andry Jean",
        role: "Tantsaha, tetikasa tontolo iainana",
      },
      {
        text: "Ny toeram-pitsaboana no namonjy ny ain'ny zanako. Misaotra anareo tokoa noho ny fahavononanareo.",
        img: "https://st.depositphotos.com/66863552/56605/v/600/depositphotos_566052540-stock-illustration-colorful-simple-flat-vector-business.jpg",
        name: "Soa Hery",
        role: "Reny",
      },
      {
        text: "Noho ny atrik'asa, nahita asa azo antoka aho. Niova tanteraka ny fiainako.",
        img: "https://cdn-icons-png.flaticon.com/512/921/921071.png",
        name: "Koto Liva",
        role: "Tanora mpandray anjara",
      },
      {
        text: "Ny fanampiana ara-tsakafo no nahafahana nanome sakafo ny ankohonako tamin'ny fotoana sarotra.",
        img: "https://cdn-icons-png.flaticon.com/512/921/921087.png",
        name: "Fali Manana",
        role: "Ray",
      },
      {
        text: "Nianatra mamaky teny sy manoratra aho noho ny tetikasa fampianarana.",
        img: "https://cdn-icons-png.flaticon.com/512/921/921092.png",
        name: "Mihaja Mahefa",
        role: "Tetikasa fanabeazana",
      },
    ]
  }
};

interface TemoinageProps {
  lang: string;
}

export default function Temoinage({ lang }: TemoinageProps) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  // Utiliser les traductions selon la langue sélectionnée
  const t = testimonialsTranslations[lang as keyof typeof testimonialsTranslations] || testimonialsTranslations.fr;

  const prev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? t.testimonials.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const next = () => {
    setStartIndex((prevIndex) =>
      prevIndex + itemsPerPage >= t.testimonials.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  const currentTestimonials = t.testimonials.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [startIndex, t.testimonials.length]);

  return (
    <section id="staff" className="min-h-screen p-8 relative">
      <div className="section-title text-center">
        <span className="bg-text">{t.title}</span>

        {/* Titre + boutons à droite */}
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-3xl font-bold ml-55">
            {t.mainTitle} <span className="highlight">{t.highlighted}</span>
          </h2>

          <div className="flex gap-2">
            <button onClick={prev}>
              <img
                src="/image.png"
                alt="Précédent"
                className="w-14 h-13 cursor-pointer ml-17"
              />
            </button>
            <button onClick={next}>
              <img
                src="/next.png"
                alt="Suivant"
                className="w-14 h-13 cursor-pointer"
              />
            </button>
          </div>
        </div>

        <p style={{ fontFamily: "bold", fontSize: "17px" }} className="mt-2">
          {t.subtitle}
        </p>
      </div>

      {/* Affichage des témoignages */}
      <div className="testimonials flex justify-center gap-6 flex-wrap mt-8 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentTestimonials.map((t, i) => (
            <motion.figure
              key={i + startIndex}
              className="snip1157 w-80 text-center relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote>
                "{t.text}"
                <div className="arrow"></div>
              </blockquote>
              <img
                className="avatar mx-auto rounded-full w-24 h-24 mt-4"
                src={t.img}
                alt={t.name}
              />
              <div className="author mt-2">
                <h5>
                  {t.name}{" "}
                  <span style={{ fontFamily: "bold" }}>{t.role}</span>
                </h5>
              </div>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}