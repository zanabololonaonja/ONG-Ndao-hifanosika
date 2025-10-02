"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import APropos from "@/components/APropos";
import Temoinage from "@/components/Temoinage";
import Partenaire from "@/components/Partenaire";
import Footer from "@/components/Footer";
import Realisation from "@/components/Realisation";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { useLanguage } from "@/contexts/LanguageContext";


import { motion, AnimatePresence } from "framer-motion";

const bebas_Neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Page() {
  const { lang } = useLanguage(); // on récupère la langue globale
  const [showVideo, setShowVideo] = useState(true);

  const translations = {
    fr: {
      title: "ONG Ndao Hifanosika",
      subtitle:
        "Nous croyons que chaque jeune, chaque enfant et chaque femme a le potentiel de transformer son avenir. Notre ONG accompagne les entrepreneurs, forme les leaders de demain et soutient les initiatives locales pour bâtir un avenir durable à Madagascar.",
      donate: "Faire un don",
      learnMore: "En savoir plus",
    },
    en: {
      title: "NGO Ndao Hifanosika",
      subtitle:
        "We believe that every young person, every child, and every woman has the potential to transform their future. Our NGO supports entrepreneurs, trains tomorrow's leaders, and promotes local initiatives to build a sustainable future in Madagascar.",
      donate: "Donate",
      learnMore: "Learn More",
    },
    mg: {
      title: "ONG Ndao Hifanosika",
      subtitle:
        "Mino izahay fa manana fahafahana hanova ny hoaviny ny tanora, ny ankizy ary ny vehivavy tsirairay. Manohana ireo mpandraharaha ny fikambananay, manofana mpitarika rahampitso ary manampy ny hetsika ifotony mba hananganana ho avy maharitra eto Madagasikara.",
      donate: "Fanomezana",
      learnMore: "Hamantatra bebe kokoa",
    },
  };

  const t = translations[lang];

  // Afficher la vidéo de splash avant la page
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 2000); // durée du splash vidéo en ms

    return () => clearTimeout(timer);
  }, []);

  if (showVideo) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <video
          src="/Logo-1-[remix] (1).mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Header /> {/* Header utilise le même contexte pour changer la langue */}
      <section id="home" className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 overflow-visible">
        <div className="relative z-10 max-w-xl space-y-6 text-center md:text-left">
          <h1 className={`mt-20 text-9xl md:text-9xl font-bold text-black tracking-wider ${bebas_Neue.className} animate-slide-left drop-shadow-[0_6px_4px_rgba(0,0,0,0.5)]`}>
            {t.title}
          </h1>
          <p  className="text-lg md:text-xl font-cinzel text-black -mt-7 animate-slide-left-delay-1">{t.subtitle}</p>
          <div className="flex justify-center md:justify-start space-x-4 animate-slide-left-delay-2">
            <Link href="/login">
              <button className="bg-[#9b4b7c] hover:bg-[#7c3b63] text-white font-semibold px-6 py-3 rounded-3xl">{t.donate}</button>
            </Link>
            <Link href="#about">
              <button className="bg-[#2596be] hover:bg-[#1e7ea1] text-white font-semibold px-6 py-3 rounded-3xl">{t.learnMore}</button>
            </Link>
          </div>
        </div>
     
        {/* Images décoratives */}
        <div className="relative z-10 hidden md:block w-[500px] h-[500px] mt-12 md:mt-0">
          <img
            src="/Design_sans_titre_1_-removebg-preview.PNG"
            alt="Photo 1"
             className="absolute -top-17 left-65 -translate-x-1/2 w-[170px] md:w-[230px] h-auto z-30 rounded-lg  animate-fade-in"
          />
          <img
            src="/Design sans titre(8).PNG"
            alt="Photo 2"
              className="absolute top-28 left-36 -translate-x-1/2 w-[280px] md:w-[350px] h-auto z-20 rounded-lg  animate-fade-in"
          />
          <img
            src="/Design_sans_titre_6_-removebg-preview.png"
            alt="Photo 3"
           className="absolute top-15 left-100 -translate-x-1/2 w-[180px] md:w-[220px] h-auto z-30 rounded-lg  animate-fade-in"
          />
          <img
            src="/Design_sans_titre_9_-removebg-preview.PNG"
            alt="Photo 4"
            className="absolute top-67 left-106 -translate-x-1/2 w-[180px] md:w-[220px] h-auto z-30 rounded-lg"
          />
          <img
            src="/Design_sans_titre_10_-removebg-preview.png"
            alt="Photo 5"
            className="absolute top-106 left-71 -translate-x-1/2 w-[180px] md:w-[239px] h-auto z-30 rounded-lg"
        
        />
       
        </div>
        
      </section>
         <div>
      {/* ...code accueil */}
      <APropos lang={lang} />
    </div>
    <div>

  <Temoinage lang={lang} />
</div>

<div>
  <Partenaire lang={lang} />
</div>

<div style={{ marginTop: "-350px", position: "relative", zIndex: 10 }}>
  <Realisation />
</div>

<div>
  <Footer lang={lang} />
</div>

    </div>
  );
}
