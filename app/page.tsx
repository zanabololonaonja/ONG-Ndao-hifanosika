"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Bebas_Neue } from "next/font/google";
import HTMLFlipBook from "react-pageflip";
import Card from "@/components/Card";
import Link from "next/link";

const bebas_Neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

// 🔹 Composant Counter avec déclenchement à l'affichage
const Counter = ({ target, suffix = "", animateUntil = target }: { target: number; suffix?: string; animateUntil?: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);


  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true); // déclenche l'animation une seule fois
          }
        });
      },
      { threshold: 0.5 } // 50% de visibilité avant de démarrer
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 2000; // durée de l'animation
    const stepTime = Math.abs(Math.floor(duration / animateUntil));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);

      if (start >= animateUntil) {
        clearInterval(timer);
        setCount(target); // 👈 affiche la vraie valeur finale
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated, target, animateUntil]);

  return (
    <h2 ref={ref} className="text-6xl font-bold">
      {count}
      {suffix}
    </h2>
  );

};

export default function Home() {
  const [showVideo, setShowVideo] = useState(true);
  const [openBook, setOpenBook] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 2000);

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




      <section
        id="about"
        className="relative min-h-screen p-8 flex flex-col justify-start text-white"
      >
        {/* Fond bleu incliné */}
        <div className="absolute inset-0 bg-[#1e7ea1] rounded-[8rem] transform skew-y-5"></div>

        {/* Contenu principal */}
        <div className="relative z-10 flex flex-col items-center text-center -mt-1">
          {/* Titre */}
     <div className="relative text-center my-16">
  {/* Texte en arrière-plan */}
  <span className="absolute left-1/2 -top-4 -translate-x-1/2 -translate-y-1/2 text-gray-200 font-extrabold text-7xl opacity-20 whitespace-nowrap select-none">
    À PROPOS
  </span>

  {/* Titre principal */}
  <h1 className="relative text-5xl -top-7 font-bold z-10 inline-block">
    À <span className="text-Whith">propos</span>
  </h1>

  {/* Petite phrase en dessous */}
  {/* <p className="mt-2 text-gray-600">
    Découvrez qui nous sommes et ce que nous faisons
  </p> */}

  {/* Ligne décorative */}
  <div className="w-16 h-1 bg-[#9b4b7c] mx-auto -mt-3"></div>
</div>

          {/* Petite phrase sous le titre */}


          {/* Partie livre + description */}
          <div className="flex w-full max-w-4xl justify-start -mt-22 items-end gap-29 ml-5">
            {/* Livre à gauche avec shadow et inclinaison */}
            <div
              className="cursor-pointer flex flex-col transform -rotate-3 shadow-[0_22px_44px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform mt-10"
              onClick={() => setOpenBook(true)}
            >

               <motion.div
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
               onClick={() => setOpenBook(true)}
          > <img
                src="/LIVRE.png"
                alt="Livre fermé"
                className="h-72 top-99 left-6 w-auto"
              /></motion.div>
             
              {/* <p className="text-center mt-2 text-white">Cliquez pour ouvrir le livre</p> */}
            </div>

            {/* Description à droite du livre */}
            <div className="flex-99 text-justify text-lg -mt-66 font-semibold">
              <motion.div
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex-1 text-justify text-lg font-semibold"
          >
              <p>
                Fondée à Fianarantsoa, Ndao Hifanosika est une ONG engagée
                dans le développement communautaire, l’éducation et l’entrepreneuriat.
                Nous travaillons main dans la main avec des associations, des partenaires
                institutionnels et des acteurs privés pour créer un impact durable.

                Notre nom, <strong>Ndao Hifanosika</strong>,
                reflète notre conviction : le changement est possible grâce à la solidarité
                et à l’action collective.
              </p>
          </motion.div>
            
            </div>

          </div>

          {/* Chiffres en bas */}
          <div className="flex justify-center mt-20 space-x-20 text-center">
            <div>
              {/* Ici on anime jusqu'à 60 puis affiche directement 700 */}
              <Counter target={1010} animateUntil={60} suffix="+" />
              <p className="font-bold">Vies transformées</p>
            </div>
            <div>
              <Counter target={50} suffix="+" />
              <p className="font-bold">Projets réalisés</p>
            </div>
            <div>
              <Counter target={30} />
              <p className="font-bold">Start-up créées</p>
            </div>
            <div>
              <Counter target={6} />
              <p className="font-bold">Start-up incubées</p>
            </div>
          </div>

        </div>

        {/* Modal avec livre ouvert */}
        {openBook && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="relative w-[900px] h-[520px]"> {/* largeur un peu plus grande */}
              {/* Bouton fermer */}
              <button
                onClick={() => setOpenBook(false)}
                className="absolute top-3 right-3 text-black text-xl font-bold z-50"
              >
                ✖
              </button>

              {/* Flipbook */}
              <HTMLFlipBook
                width={830}  // largeur du livre plus grande
                height={540}
                className="shadow-2xl rounded-xl"
                showCover={false}
              >
                {/* Page 1 */}
                <div className="relative w-full h-full">
                  <img
                    src="/book.png"
                    alt="Livre ouvert"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Page gauche */}
                  <div className="absolute left-22 top-10 h-[0%] p-6 text-black text-sm font-semibold flex flex-col justify-between w-[39%]">
                    <div className="text-justify break-words">
                      <span className="text-2xl font-bold float-left mr-1">T</span>
                      out commence en octobre 2019, à Fianarantsoa. Constatant le manque d’opportunités d’emploi et le faible développement économique de la région, cinq jeunes filles décident d’agir. Elles organisent l’événement Ndao Hifanosika Fianara,
                      avec pour objectif de promouvoir l’entrepreneuriat et de donner aux jeunes l’envie de créer leur propre avenir. </div>
                    <div className="flex justify-center -mt-7">
                      <a href="/ON.jpg" target="_blank" rel="noopener noreferrer">
                        <img
                          src="/onnn.png"
                          alt="illustration"
                          className="w-80 h-70 object-contain cursor-pointer rounded-md  transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </a>
                    </div>

                  </div>

                  {/* Page droite */}
                  <div className="absolute right-20 top-10 h-[80%] p-6 text-black text-sm font-semibold flex flex-col justify-between w-[40%]">
                    <div className="text-justify break-words leading-relaxed">
                      <span className="text-2xl font-bold float-left mr-2">L</span>
                      e 29 février 2020, cet événement marque un véritable tournant : il ne se limite pas seulement à inspirer la création d’emplois, mais il éveille aussi une prise de conscience collective et suscite une dynamique positive dans toute la communauté. Face à cet élan, le club prend rapidement de l’ampleur et, en septembre 2021, il franchit une étape importante en évoluant officiellement en ONG Ndao Hifanosika. Aujourd’hui, notre mission est claire et affirmée : autonomiser les jeunes, les enfants et les femmes, tout en les encourageant à contribuer activement non seulement au développement
                      de Fianarantsoa, mais aussi à celui de la région et, plus largement, de Madagascar tout entier.
                    </div>



                  </div>
                  <div className="absolute bottom-3 left-[89%]  color-black transform -translate-x-1/2 text-2xl animate-bounce">
                    <img src="/mains.png" alt="illustration" className="w-20 h-20 object-contain cursor-pointer" />
                  </div>

                </div>




                {/* Page 2  gauche*/}
                <div className="relative w-full h-full">
                  <img
                    src="/book.png"
                    alt="Livre ouvert"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute left-22 top-10 h-[0%] p-6 text-black text-sm font-semibold flex flex-col justify-between w-[39%]">
                    <div className="text-justify break-words">
                      <h1 className="font-bold text-3xl text-center mb-2">Notre vision</h1>

                      <span className="text-2xl font-bold float-left mr-1">C</span>
                      onstruire une jeunesse non seulement active et rentable, mais aussi responsable, consciente
                      et déterminée, capable d’innover, de proposer des solutions créatives et de jouer un rôle
                      majeur en tant qu’actrice du développement durable de notre pays
                      . Nous aspirons à former une génération engagée et visionnaire, profondément
                      consciente de ses responsabilités envers la société et l’environnement, prête
                      à relever avec courage et persévérance tous les défis. Cette jeunesse sera également encouragée à développer ses compétences, à s’entraider et à collaborer afin de contribuer
                      activement à un avenir plus prospère.
                    </div>
                    {/* <div className="flex justify-center -mt-7">
  <a href="/ON.jpg" target="_blank" rel="noopener noreferrer">
    <img
      src="/onnn.png"
      alt="illustration"
      className="w-80 h-70 object-contain cursor-pointer rounded-md  transition-transform duration-300 ease-in-out hover:scale-105"
    />
  </a>
</div> */}

                  </div>


                  {/* Page 2  droit*/}

                  <div className="absolute right-20 top-10 h-[80%] p-6 text-black text-sm font-semibold flex flex-col justify-between w-[40%]">
                    <div className="text-justify break-words leading-relaxed">

                      <div className="flex justify-center -mt-7">
                        <a href="/boky.jpg" target="_blank" rel="noopener noreferrer">
                          <img
                            src="/boky.jpg"
                            alt="illustration"
                            className="w-80 h-89 object-contain cursor-pointer rounded-md  transition-transform duration-300 ease-in-out hover:scale-105"
                          />
                        </a>
                      </div>

                      <div className="absolute text-justify break-words bottom-9 w-full px-6 w-[22%] left-[0%] ">
                        « Ensemble, nous façonnons une jeunesse prête à bâtir un avenir meilleur pour Madagascar et pour les générations à venir. »
                      </div>

                    </div>

                  </div>

                  <div className="absolute bottom-3 left-[89%]  color-black transform -translate-x-1/2 text-2xl animate-bounce">
                    <img src="/mains.png" alt="illustration" className="w-20 h-20 object-contain cursor-pointer" />
                  </div>


                  <div className="absolute bottom-3 left-1/9 transform -translate-x-1/2 text-2xl animate-bounce">
                    <img src="/main.png" alt="illustration" className="w-20 h-20 object-contain cursor-pointer" />
                  </div>
                </div>

                {/* Page 3 */}
                <div className="relative w-full h-full">
                  <img
                    src="/book.png"
                    alt="Livre ouvert"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute left-22 top-10 h-[0%] p-6 text-black text-sm font-semibold flex flex-col justify-between w-[39%]">
                    <div className="text-justify break-words">
                      <h1 className="font-bold text-3xl text-center mb-2">Notre vision</h1>
                      <span className="text-2xl font-bold float-left mr-1">A</span>
                      <strong> mour de la patrie </strong> : nous œuvrons avec passion et détermination pour le développement de Madagascar, en plaçant toujours l’intérêt de notre nation au centre de nos actions.
                      <br /> <strong>- Excellence</strong> : nous nous engageons à offrir un accompagnement de qualité, à encourager la créativité
                      et l’innovation, et à viser toujours plus haut afin d’inspirer et de transformer positivement notre société.
                      <br /> <strong>- Intégrité</strong> : nous croyons en la transparence, l’honnêteté et la responsabilité dans chacune de nos actions, car seules des bases solides de confiance et de droiture peuvent assurer un changement durable
                      et bénéfique pour tous. </div>

                  </div>

                  <div className="absolute right-20 top-10 h-[80%] p-6 text-black text-sm font-semibold flex flex-col justify-between w-[40%]">
                    <div className="flex justify-center -mt-7">
                      <a href="/bok.jpg" target="_blank" rel="noopener noreferrer">
                        <img
                          src="/bok.jpg"
                          alt="illustration"
                          className="w-80 h-70 object-contain cursor-pointer rounded-md  transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </a>
                    </div>

                  </div>
                   <div className="absolute right-20 top-50 h-[80%] p-6 text-black text-sm font-semibold flex flex-col justify-between w-[40%]">
                    <div className="flex justify-center -mt-7">
                      <a href="/boky3.jpg" target="_blank" rel="noopener noreferrer">
                        <img
                          src="/boky3.jpg"
                          alt="illustration"
                          className="w-80 h-70 object-contain cursor-pointer rounded-md  transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </a>
                    </div>

                  </div>

                  {/* 
      <div className="absolute bottom-3 left-[89%]  color-black transform -translate-x-1/2 text-2xl animate-bounce">
  <img src="/mains.png" alt="illustration" className="w-20 h-20 object-contain"/>
</div>
 */}

                  <div className="absolute bottom-3 left-1/9 transform -translate-x-1/2 text-2xl animate-bounce">
                    <img src="/main.png" alt="illustration" className="w-20 h-20 object-contain cursor-pointer" />
                  </div>
                </div>

              </HTMLFlipBook>
            </div>
          </div>

        )}



      </section>

      {/* Section Staff */}
     <section id="staff" className="min-h-screen p-8 ">
 <div className="section-title">
  <span className="bg-text">TÉMOIGNAGES</span>
  <h2>
    Témoignages de nos <span className="highlight">bénéficiaires</span>
  </h2>
  <p style={{fontFamily:"bold",fontSize:"17px"}}>À travers leurs mots, mesurez la portée réelle de nos actions quotidiennes</p>
</div>


     <div className="testimonials">
  <figure className="snip1157">
    <blockquote>
   "Grâce à Ndao hifanosika, mes enfants peuvent maintenant aller à l'école. C'est un rêve qui devient réalité."
      <div className="arrow"></div>
    </blockquote>
    <img   className="avatar" src="https://media.istockphoto.com/id/1407659288/fr/vectoriel/portrait-dune-jeune-femme-souriante-aux-cheveux-bruns-fluides-une-fille-en-t-shirt-blanc.jpg?s=612x612&w=0&k=20&c=YEM7lGkevVW59fTm8Ehnbl-e8QeTD3i7DaBueLOj-MA=" alt="sq-sample3" />
    <div className="author">
      <h5>Rakoto Marie <span style={{fontFamily:"bold"}}>  Bénéficiaire du programme éducation</span></h5>
    </div>
  </figure>

  <figure className="snip1157 hover">
    <blockquote>
"Les formations en agriculture durable ont transformé ma ferme. Ma famille vit mieux maintenant."
      <div className="arrow"></div>
    </blockquote>
   <img 
  src="https://st5.depositphotos.com/92370522/78999/v/600/depositphotos_789993152-stock-illustration-business-man-avatar-cartoon-character.jpg" 
  alt="avatar" 
  className="avatar"
/>
<div className="author">
  <h5>Andry Jean <span style={{fontFamily:"bold"}}>Agriculteur, programme environnement</span></h5>
</div>

  </figure>

  <figure className="snip1157">
    <blockquote>
      "Le centre de santé a sauvé la vie de mon bébé. Merci pour votre dévouement incroyable."
      <div className="arrow"></div>
    </blockquote>
    <img   className="avatar" src="https://st.depositphotos.com/66863552/56605/v/600/depositphotos_566052540-stock-illustration-colorful-simple-flat-vector-business.jpg" alt="sq-sample17" />
    <div className="author">
      <h5>Soa Hery <span style={{fontFamily:"bold"}}> <br />
        Mère de famille</span></h5>
    </div>
  </figure>
</div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card name="Tiavina Ratovonanahary" role="Directeur" img="/images/staff1.jpg" />
          <Card name="Mihaja Mahefa" role="Coordinateur" img="/images/staff2.jpg" />
          <Card name="Fali Manana" role="Assistant" img="/images/staff3.jpg" />
        </div> */}
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
