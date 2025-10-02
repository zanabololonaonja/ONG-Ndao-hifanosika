"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HTMLFlipBook from "react-pageflip";

// Traductions pour toute la section
const translations = {
  fr: {
    title: "À PROPOS",
    highlightedTitle: "À propos",
    description: "Fondée à Fianarantsoa, Ndao Hifanosika est une ONG engagée dans le développement communautaire, l'éducation et l'entrepreneuriat. Nous travaillons main dans la main avec des associations, des partenaires institutionnels et des acteurs privés pour créer un impact durable. Notre nom, Ndao Hifanosika, reflète notre conviction : le changement est possible grâce à la solidarité et à l'action collective.",
    stats: {
      lives: "Vies transformées",
      projects: "Projets réalisés",
      startups: "Start-up créées",
      incubated: "Start-up incubées"
    },
    book: {
      page1: {
        left: "out commence en octobre 2019, à Fianarantsoa. Constatant le manque d'opportunités d'emploi et le faible développement économique de la région, cinq jeunes filles décident d'agir. Elles organisent l'événement Ndao Hifanosika Fianara, avec pour objectif de promouvoir l'entrepreneuriat et de donner aux jeunes l'envie de créer leur propre avenir.",
        right: "e 29 février 2020, cet événement marque un véritable tournant : il ne se limite pas seulement à inspirer la création d'emplois, mais il éveille aussi une prise de conscience collective et suscite une dynamique positive dans toute la communauté. Face à cet élan, le club prend rapidement de l'ampleur et, en septembre 2021, il franchit une étape importante en évoluant officiellement en ONG Ndao Hifanosika. Aujourd'hui, notre mission est claire et affirmée : autonomiser les jeunes, les enfants et les femmes, tout en les encourageant à contribuer activement non seulement au développement de Fianarantsoa, mais aussi à celui de la région et, plus largement, de Madagascar tout entier."
      },
      page2: {
        title: "Notre vision",
        left: "onstruire une jeunesse non seulement active et rentable, mais aussi responsable, consciente et déterminée, capable d'innover, de proposer des solutions créatives et de jouer un rôle majeur en tant qu'actrice du développement durable de notre pays. Nous aspirons à former une génération engagée et visionnaire, profondément consciente de ses responsabilités envers la société et l'environnement, prête à relever avec courage et persévérance tous les défis. Cette jeunesse sera également encouragée à développer ses compétences, à s'entraider et à collaborer afin de contribuer activement à un avenir plus prospère.",
        quote: "« Ensemble, nous façonnons une jeunesse prête à bâtir un avenir meilleur pour Madagascar et pour les générations à venir. »"
      },
      page3: {
        title: "Nos valeurs",
        left: "mour de la patrie : nous œuvrons avec passion et détermination pour le développement de Madagascar, en plaçant toujours l'intérêt de notre nation au centre de nos actions.\n- Excellence : nous nous engageons à offrir un accompagnement de qualité, à encourager la créativité et l'innovation, et à viser toujours plus haut afin d'inspirer et de transformer positivement notre société.\n- Intégrité : nous croyons en la transparence, l'honnêteté et la responsabilité dans chacune de nos actions, car seules des bases solides de confiance et de droiture peuvent assurer un changement durable et bénéfique pour tous."
      }
    }
  },
  en: {
    title: "ABOUT",
    highlightedTitle: "About",
    description: "Founded in Fianarantsoa, Ndao Hifanosika is an NGO committed to community development, education, and entrepreneurship. We work hand in hand with associations, institutional partners, and private actors to create sustainable impact. Our name, Ndao Hifanosika, reflects our belief: change is possible through solidarity and collective action.",
    stats: {
      lives: "Transformed lives",
      projects: "Projects completed",
      startups: "Start-ups created",
      incubated: "Incubated start-ups"
    },
    book: {
      page1: {
        left: "t all began in October 2019, in Fianarantsoa. Noticing the lack of employment opportunities and the weak economic development of the region, five young women decided to take action. They organized the Ndao Hifanosika Fianara event, with the goal of promoting entrepreneurship and inspiring young people to create their own future.",
        right: "n February 29, 2020, this event marked a real turning point: it not only inspired job creation but also awakened collective awareness and sparked positive momentum throughout the community. Faced with this momentum, the club quickly grew and, in September 2021, reached an important milestone by officially becoming the Ndao Hifanosika NGO. Today, our mission is clear and affirmed: to empower youth, children, and women, while encouraging them to actively contribute not only to the development of Fianarantsoa but also to the region and, more broadly, to all of Madagascar."
      },
      page2: {
        title: "Our vision",
        left: "onstruct a youth that is not only active and profitable but also responsible, aware, and determined, capable of innovating, proposing creative solutions, and playing a major role as actors in the sustainable development of our country. We aspire to train an engaged and visionary generation, deeply conscious of its responsibilities towards society and the environment, ready to face all challenges with courage and perseverance. This youth will also be encouraged to develop their skills, help each other, and collaborate to actively contribute to a more prosperous future.",
        quote: "« Together, we shape a youth ready to build a better future for Madagascar and for generations to come. »"
      },
      page3: {
        title: "Our values",
        left: "ove for the homeland: we work with passion and determination for the development of Madagascar, always placing the interest of our nation at the center of our actions.\n- Excellence: we commit to providing quality support, encouraging creativity and innovation, and always aiming higher to inspire and positively transform our society.\n- Integrity: we believe in transparency, honesty, and responsibility in each of our actions, because only solid foundations of trust and righteousness can ensure lasting and beneficial change for all."
      }
    }
  },
  mg: {
    title: "MOMBA ANTSIKA",
    highlightedTitle: "Momba antsika",
    description: "Niorina tao Fianarantsoa, Ndao Hifanosika dia fikambanana iray miady ho an'ny fampandrosoana ny fiaraha-monina, ny fanabeazana ary ny asa orinasa. Miara-miasa amin'ny fikambanana, mpiara-miasa ara-panjakana ary mpandraharaha tsy miankina izahay mba hamokatra vokatra maharitra. Ny anarantsika, Ndao Hifanosika, dia maneho ny finoantsika: afaka miova ny zava-drehetra amin'ny alalan'ny firaisankina sy ny hetsika iaraha-manao.",
    stats: {
      lives: "Fiainana novaina",
      projects: "Tetikasa vita",
      startups: "Orinasa natsangana",
      incubated: "Orinasa nampidirina"
    },
    book: {
      page1: {
        left: "eraka ny volana Oktobra 2019, tao Fianarantsoa. Nahita ny tsy fisian'ny fahafahana hiasa sy ny tsy fahampian'ny fampandrosoana ara-toekarena tao amin'ny faritra, zatovo vavy dimy no nanapa-kevitra hanao zavatra. Nanangana ny hetsika Ndao Hifanosika Fianara izy ireo, amin'ny tanjona hanentanana ny asa orinasa sy hanome ny tanora ny fanirana hamorona ny ho aviny.",
        right: "y ny 29 Febroary 2020, io hetsika io dia nanamafy fiovana tena lehibe: tsy nanentana ny famoronana asa fotsiny izany, fa nahatsiaro tena ny fiaraha-monina rehetra ary niteraka hery mahery vaika tao anatin'ny fiaraha-monina. Niatrika io hery mahery vaika io, ny klioba dia nitombo haingana ary, tamin'ny Septambra 2021, dia nandika teboka lehibe iray tamin'ny fivoarana ofisialy ho ONG Ndao Hifanosika. Amin'izao, ny misiônanao dia mazava sy voafaritra: hanome hery ny tanora, ny ankizy ary ny vehivavy, raha mamporisika azy ireo handray anjara mavitrika tsy amin'ny fampandrosoan'i Fianarantsoa fotsiny, fa amin'ny fampandrosoan'ny faritra ary, ankapobeny, an'i Madagasikara manontolo."
      },
      page2: {
        title: "Ny fahitantsika",
        left: "orona tanora tsy mavitra sy mahomby fotsiny, fa tompon'andraikitra, mahalala ary tapa-kevitra koa, afaka mamorona vaovao, manolotra vahaolana mamorona ary milalao anjara toerana lehibe ho lasa mpandraharaha amin'ny fampandrosoana maharitra an'i Madagasikara. Miady hitovy taranaka miandraikitra sy manana fahitana izahay, lalina mahalala ny andraikiny amin'ny fiaraha-monina sy ny tontolo iainana, vonona hiatrehana ny ady rehetra amin'ny herim-po sy ny faharetana. Ho entina hampandroso ny fahaizany, hifanampy ary hiaraha-miasa koa io tanora io mba handray anjara mavitra amin'ny ho avy be fanantenana kokoa.",
        quote: "« Miara-manorina tanora vonona hanangana ho avy tsara kokoa ho an'i Madagasikara sy ho an'ny taranaka ho avy. »"
      },
      page3: {
        title: "Ny soatoavintsika",
        left: "itiavana ny tanindrazana: miasa amin'ny fo feno hafanam-po sy faharetana izahay ho an'ny fampandrosoan'i Madagasikara, mametraka foana ny tombontsoan'ny firenentsika eo afovoan'ny hetsika rehetra.\n- Fahamendrehana: manolo-tena amin'ny fanomezana fanampiana tsara kalitao, fanentanana ny fahaizana mamorona sy mamorona vaovao, ary mikendry foana ny avo kokoa mba hanentana sy hanova tsara ny fiaraha-monina.\n- Fahamarinana: mino ny fahazavana, ny fahitsiana ary ny andraikitra amin'ny hetsika rehetra, satria ny fototra matanjaka feno fitokisana sy fahamarinana ihany no afaka manome antoka fiovana maharitra sy mahasoa ho an'ny rehetra."
      }
    }
  }
};

// Composant Counter intégré pour éviter l'import manquant
const Counter = ({ target, suffix = "", animateUntil = target }: { target: number; suffix?: string; animateUntil?: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / animateUntil));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= animateUntil) {
        clearInterval(timer);
        setCount(target);
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

// Composant principal APropos
export default function APropos({ lang = "fr", setLang }: { lang?: string; setLang?: (lang: string) => void }) {
  const [openBook, setOpenBook] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Utiliser les traductions selon la langue sélectionnée
  const t = translations[lang as keyof typeof translations] || translations.fr;

  return (
    <section
      id="about"
      className="relative min-h-screen p-8 flex flex-col justify-start text-white"
    >
      {/* Fond bleu incliné */}
      <div className="absolute inset-0 bg-[#1e7ea1] rounded-[8rem] transform skew-y-5"></div>

      {/* Sélecteur de langue */}
   

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center text-center -mt-1">
        {/* Titre */}
        <div className="relative text-center my-16">
          <span className="absolute left-1/2 -top-4 -translate-x-1/2 -translate-y-1/2 text-gray-200 font-extrabold text-7xl opacity-20 whitespace-nowrap select-none">
            {t.title}
          </span>
          <h1 className="relative text-5xl -top-7 font-bold z-10 inline-block">
            {t.highlightedTitle.split(' ')[0]} <span className="text-white">{t.highlightedTitle.split(' ').slice(1).join(' ')}</span>
          </h1>
          <div className="w-16 h-1 bg-[#9b4b7c] mx-auto -mt-3"></div>
        </div>

        {/* Livre + description */}
        <div className="flex w-full max-w-4xl justify-start -mt-22 items-end gap-10 ml-5">
          {/* Livre à gauche */}
          <div
            className="cursor-pointer flex flex-col transform -rotate-3 shadow-[0_22px_44px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform mt-10"
            onClick={() => setOpenBook(true)}
          >
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <img src="/LIVRE.png" alt="Livre fermé" className="h-72 w-auto" />
            </motion.div>
          </div>

          {/* Description à droite */}
          <div className="flex-1 text-justify text-lg -mt-66 font-semibold">
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p>{t.description}</p>
            </motion.div>
          </div>
        </div>

        {/* Chiffres */}
        <div className="flex justify-center mt-20 space-x-20 text-center">
          <div>
            <Counter target={1010} animateUntil={60} suffix="+" />
            <p className="font-bold">{t.stats.lives}</p>
          </div>
          <div>
            <Counter target={50} suffix="+" />
            <p className="font-bold">{t.stats.projects}</p>
          </div>
          <div>
            <Counter target={30} />
            <p className="font-bold">{t.stats.startups}</p>
          </div>
          <div>
            <Counter target={6} />
            <p className="font-bold">{t.stats.incubated}</p>
          </div>
        </div>

        {/* Modal FlipBook */}
        {openBook && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="relative w-[900px] h-[520px]">
              <button
                onClick={() => setOpenBook(false)}
                className="absolute top-3 right-3 text-black text-xl font-bold z-50"
              >
                ✖
              </button>
              <HTMLFlipBook
                width={830}
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
                      <span className="text-2xl font-bold float-left mr-1">
                        {lang === "fr" ? "T" : lang === "en" ? "I" : "V"}
                      </span>
                      {t.book.page1.left}
                    </div>
                    <div className="flex justify-center -mt-7">
                      <a href="/ON.jpg" target="_blank" rel="noopener noreferrer">
                        <img
                          src="/onnn.png"
                          alt="illustration"
                          className="w-80 h-70 object-contain cursor-pointer rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Page droite */}
                  <div className="absolute right-20 top-10 h-[80%] p-6 text-black text-sm font-semibold flex flex-col justify-between w-[40%]">
                    <div className="text-justify break-words leading-relaxed">
                      <span className="text-2xl font-bold float-left mr-2">
                        {lang === "fr" ? "L" : lang === "en" ? "O" : "N"}
                      </span>
                      {t.book.page1.right}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-[89%] color-black transform -translate-x-1/2 text-2xl animate-bounce">
                    <img src="/mains.png" alt="illustration" className="w-20 h-20 object-contain cursor-pointer" />
                  </div>
                </div>

                {/* Page 2 gauche */}
                <div className="relative w-full h-full">
                  <img
                    src="/book.png"
                    alt="Livre ouvert"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute left-22 top-10 h-[0%] p-6 text-black text-sm font-semibold flex flex-col justify-between w-[39%]">
                    <div className="text-justify break-words">
                      <h1 className="font-bold text-3xl text-center mb-2">{t.book.page2.title}</h1>
                      <span className="text-2xl font-bold float-left mr-1">
                        {lang === "fr" ? "C" : lang === "en" ? "B" : "M"}
                      </span>
                      {t.book.page2.left}
                    </div>
                  </div>

                  {/* Page 2 droit */}
                  <div className="absolute right-20 top-10 h-[80%] p-6 text-black text-sm font-semibold flex flex-col justify-between w-[40%]">
                    <div className="text-justify break-words leading-relaxed">
                      <div className="flex justify-center -mt-7">
                        <a href="/boky.jpg" target="_blank" rel="noopener noreferrer">
                          <img
                            src="/boky.jpg"
                            alt="illustration"
                            className="w-80 h-89 object-contain cursor-pointer rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
                          />
                        </a>
                      </div>
                      <div className="absolute text-justify break-words bottom-9 w-full px-6 w-[22%] left-[0%]">
                        {t.book.page2.quote}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-[89%] color-black transform -translate-x-1/2 text-2xl animate-bounce">
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
                      <h1 className="font-bold text-3xl text-center mb-2">{t.book.page3.title}</h1>
                      <span className="text-2xl font-bold float-left mr-1">
                        {lang === "fr" ? "A" : lang === "en" ? "L" : "F"}
                      </span>
                      {t.book.page3.left}
                    </div>
                  </div>

                  {/* droite */}
                  <div className="absolute right-20 top-10 h-[80%] p-6 text-black text-sm font-semibold flex flex-col justify-between w-[40%]">
                    <div className="flex justify-center -mt-7">
                      <a href="/bok.jpg" target="_blank" rel="noopener noreferrer">
                        <img
                          src="/bok.jpg"
                          alt="illustration"
                          className="w-80 h-70 object-contain cursor-pointer rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
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
                          className="w-80 h-70 object-contain cursor-pointer rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </a>
                    </div>
                  </div>

                  {/* main */}
                  <div className="absolute bottom-3 left-1/9 transform -translate-x-1/2 text-2xl animate-bounce">
                    <img src="/main.png" alt="illustration" className="w-20 h-20 object-contain cursor-pointer" />
                  </div>
                </div>
              </HTMLFlipBook>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}