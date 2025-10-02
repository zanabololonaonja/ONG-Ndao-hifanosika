"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour l'inscription à la newsletter
    console.log("Email inscrit:", email);
    setEmail("");
    alert("Merci pour votre inscription à notre newsletter !");
  };

  return (
    <section className="bg-[#2596be] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        
        {/* Section principale du footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Colonne 1: Logo et description */}
          <div className="lg:col-span-1">
  <div className="flex items-center mb-6">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
      <span className="text-[#2596be] font-bold text-lg">NH</span>
    </div>
    <h3 className="text-2xl font-bold">Ndao Hifanosika</h3>
  </div>
  <p className="text-blue-100 leading-relaxed mb-6">
    Ensemble, nous façonnons une jeunesse prête à bâtir un avenir meilleur pour Madagascar et pour les générations à venir.
  </p>
  <div className="flex space-x-4">
    {/* LinkedIn */}
    <a 
      href="https://www.linkedin.com/in/ong-ndao-hifanosika-73a673252/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
    
    {/* Facebook */}
    <a 
      href="https://www.facebook.com/ndaohifanosikafianara/?locale=fr_FR" 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </a>
    
    {/* Email */}
    <a 
      href="mailto:contact@ndaohifanosika.org" 
      className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    </a>
  </div>
</div>
          {/* Colonne 2: Liens rapides */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-4 border-b-2 border-white/22 pb-2">Liens Rapides</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-blue-100 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#projects" className="text-blue-100 hover:text-white transition-colors">Nos projets</a></li>
              <li><a href="#testimonials" className="text-blue-100 hover:text-white transition-colors">Témoignages</a></li>
              <li><a href="#partners" className="text-blue-100 hover:text-white transition-colors">Partenaires</a></li>
              <li><a href="#contact" className="text-blue-100 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Colonne 3: Contact (remplace Nos Projets) */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 border-b-2 border-white/30 pb-2">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <p className="text-blue-100 text-sm">Lot 28TB/3609 Talatamaty ambany Fianarantsoa, Madagascar</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-blue-100 text-sm">+261 32 40 836 29</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-blue-100 text-sm">ndaohifanosikafianarantsoa@gmail.org</p>
              </div>
            </div>
          </div>

          {/* Colonne 4: Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 border-b-2 border-white/30 pb-2">Newsletter</h4>
            <p className="text-blue-100 mb-4">
              Restez informé de nos actions et projets.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 placeholder-blue-200 text-white focus:outline-none focus:border-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-[#2596be] py-2 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
              Faire un don
              </button>
            </form>
          </div>
        </div>

        {/* Copyright centré */}
        <div className="border-t border-white/30 pt-8 text-center">
          <p className="text-blue-100 text-sm">
            © 2025 Ndao Hifanosika.
          </p>
        </div>
      </div>
    </section>
  );
}