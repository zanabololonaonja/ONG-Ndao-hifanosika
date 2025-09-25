"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";

const bebas_Neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    // Après 2 secondes, on cache la vidéo et on affiche la page
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showVideo) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <video
          src="/Logo-1-[remix] (1).mp4" // Mets ta vidéo dans /public/intro.mp4
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
      <Header />
      <section
        id="home"
        className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 overflow-visible"
      >
        <div className="relative z-10 max-w-xl space-y-6 text-center md:text-left">
          {/* Titre */}
          <h1
            className={`mt-20 text-9xl md:text-9xl font-bold text-black tracking-wider ${bebas_Neue.className} animate-slide-left drop-shadow-[0_6px_4px_rgba(0,0,0,0.5)]`}
          >
            ONG Ndao Hifanosika
          </h1>

          {/* Sous-titre */}
          <p className="text-lg md:text-xl font-cinzel text-black -mt-7 animate-slide-left-delay-1">
            Nous croyons que chaque jeune, chaque enfant et chaque femme a le potentiel
            de transformer son avenir. Notre ONG accompagne les entrepreneurs, forme
            les leaders de demain et soutient les initiatives locales pour bâtir un
            avenir durable à Madagascar.
          </p>

          {/* Boutons */}
          <div className="flex justify-center md:justify-start space-x-4 animate-slide-left-delay-2">
            <Link href="/login">
              <button className="bg-[#9b4b7c] hover:bg-[#7c3b63] cursor-pointer font-semibold text-white px-6 py-3 rounded-3xl shadow-md transition duration-300">
                Faire un don
              </button>
            </Link>
            <Link href="#about">
              <button className="bg-[#2596be] hover:bg-[#1e7ea1] cursor-pointer text-white font-semibold px-6 py-3 rounded-3xl shadow-md transition duration-300">
                En savoir plus
              </button>
            </Link>
          </div>
        </div>
     

  {/* Images droites en triangle */}
  <div className="relative z-10 hidden md:block w-[500px] h-[500px] mt-12 md:mt-0">
    {/* Image 1 */}
    <img
      src="/Design_sans_titre_1_-removebg-preview.PNG"
      alt="Photo 1"
      className="absolute -top-17 left-65 -translate-x-1/2 w-[170px] md:w-[230px] h-auto z-30 rounded-lg  animate-fade-in"
    />

    {/* Image  intermédiaire) */}
    <img
      src="/Design sans titre(8).PNG"
      alt="Photo 3"
      className="absolute top-28 left-36 -translate-x-1/2 w-[280px] md:w-[350px] h-auto z-20 rounded-lg  animate-fade-in"
    />

 {/* Image 1 */}
 <img
      src="/Design_sans_titre_6_-removebg-preview.png"
      alt="Photo 1"
      className="absolute top-15 left-100 -translate-x-1/2 w-[180px] md:w-[220px] h-auto z-30 rounded-lg  animate-fade-in"
    />
     {/* Image 1 */}
     <img
      src="/Design_sans_titre_9_-removebg-preview.PNG"
      alt="Photo 1"
      className="absolute top-67 left-106 -translate-x-1/2 w-[180px] md:w-[220px] h-auto z-30 rounded-lg  animate-fade-in"
    />


 <img
      src="/Design_sans_titre_10_-removebg-preview.png"
      alt="Photo 1"
      className="absolute top-106 left-71 -translate-x-1/2 w-[180px] md:w-[239px] h-auto z-30 rounded-lg  animate-fade-in"
    />

  </div>
</section>

      {/* Section À propos */}
    {/* Section À propos */}
<section
  id="about"
  className="relative min-h-screen p-8 flex flex-col justify-center text-white"
>
  {/* Background image */}
  <div
    className="absolute inset-0 bg-[url('/font.png')] bg-cover bg-center opacity-90"
  ></div>

  {/* Contenu */}
  <div className="relative z-10">
    <h2 className="text-4xl font-bold mb-4">À propos</h2>
    <p>
      Notre ONG travaille pour améliorer les conditions de vie,
      accompagner les jeunes et soutenir les initiatives locales.
    </p>
  </div>
</section>


      {/* Section Staff */}
      <section id="staff" className="min-h-screen p-8 bg-gray-50">
        <h2 className="text-4xl font-bold mb-6">Notre Staff</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card name="Tiavina Ratovonanahary" role="Directeur" img="/images/staff1.jpg" />
          <Card name="Mihaja Mahefa" role="Coordinateur" img="/images/staff2.jpg" />
          <Card name="Fali Manana" role="Assistant" img="/images/staff3.jpg" />
        </div>
      </section>

      {/* Section Projets */}
      <section id="projects" className="min-h-screen p-8 bg-white">
        <h2 className="text-4xl font-bold mb-6">Projets réalisés</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card name="Projet 1" role="Description courte" img="/images/projet1.png" />
          <Card name="Projet 2" role="Description courte" img="/images/projet2.png" />
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="min-h-screen p-8 bg-gray-50">
        <h2 className="text-4xl font-bold mb-4">Contact</h2>
        <p>Email : contact@ongndao.com</p>
        <p>Téléphone : +261 32 00 000 00</p>
      </section>
    </div>
  );
}
