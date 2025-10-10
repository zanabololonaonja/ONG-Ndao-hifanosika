'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ActualitesPage() {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedImages, setExpandedImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Récupérer toutes les actualités PUBLIÉES
  const fetchActualites = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔄 Chargement des actualités...');
      const response = await fetch('http://localhost:5000/api/actualites');
      
      console.log('📡 Statut de la réponse:', response.status);
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📦 Données reçues:', data);
      
      if (data.success) {
        setActualites(data.actualites || []);
      } else {
        setError(data.message || 'Erreur inconnue du serveur');
      }
    } catch (error) {
      console.error('❌ Erreur fetch:', error);
      setError('Impossible de charger les actualités. Vérifiez que le serveur est démarré.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActualites();
  }, []);

  // Filtrer les actualités selon la recherche
  const filteredActualites = actualites.filter(actualite =>
    actualite.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    actualite.contenu?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    actualite.createur_nom_complet?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle l'affichage de toutes les images
  const toggleExpandImages = (actualiteId) => {
    setExpandedImages(prev => ({
      ...prev,
      [actualiteId]: !prev[actualiteId]
    }));
  };

  // Ouvrir la modal d'image
  const openImageModal = (images, index = 0) => {
    setSelectedImage(images);
    setCurrentImageIndex(index);
  };

  // Fermer la modal d'image
  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  // Image suivante
  const nextImage = () => {
    if (selectedImage && currentImageIndex < selectedImage.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Image précédente
  const prevImage = () => {
    if (selectedImage && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Formater la date
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Construire l'URL complète de l'image
  const buildImageUrl = (imagePath) => {
    if (!imagePath) return '';
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${API_URL}${normalizedPath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Menu fixe */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo à gauche */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    ONG
                  </div>
                  <span className="ml-2 text-lg font-semibold text-gray-900">Solidarité</span>
                </div>
              </div>

              {/* Barre de recherche au centre */}
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher une actualité..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Icônes à droite */}
              <div className="flex items-center space-x-4">
                {/* Icône maison avec notification */}
                <div className="relative">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {actualites.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {actualites.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Flèche de retour */}
                <Link 
                  href="/"
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu avec marge pour le menu fixe */}
        <div className="pt-16">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center text-lg">Chargement des actualités...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Menu fixe */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo à gauche */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    ONG
                  </div>
                  <span className="ml-2 text-lg font-semibold text-gray-900">Solidarité</span>
                </div>
              </div>

              {/* Barre de recherche au centre */}
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher une actualité..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Icônes à droite */}
              <div className="flex items-center space-x-4">
                {/* Icône maison avec notification */}
                <div className="relative">
                  <button  onClick={fetchActualites} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {actualites.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {actualites.length}
                      </span>
                    )}
                  </button>
                  
                </div>
                

                {/* Flèche de retour */}
                <Link 
                  href="/"
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu avec marge pour le menu fixe */}
        <div className="pt-16">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Erreur :</strong> {error}
            </div>
            <div className="text-center">
              <button
                onClick={fetchActualites}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Menu fixe */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo à gauche */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
               
                <span className="ml-2 text-lg font-semibold text-gray-900"> <img
        src="/logoremove.png"
        alt="Logo"
        className="h-22 fixed -top-3 left-11"
      /></span>
              </div>
            </div>

          
            {/* Icônes à droite */}
            <div className="flex items-center space-x-4">
              {/* Icône maison avec notification */}
               <div className="relative">
               <input
  placeholder="Rechercher..."
  className="w-64 pl-8 pr-3 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  
                  <svg   onClick={fetchActualites} className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {actualites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {actualites.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Flèche de retour */}
              <Link 
                href="/"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu avec marge pour le menu fixe */}
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* En-tête */}
          <div className="text-center mb-12">
            <br /><br /><br /><br />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Découvrez  l'actualités de l'ONG ,les dernières nouvelles, événements et activités de notre organisation
            </h1>
           
          </div>

          {/* Indicateur de recherche */}
          {searchTerm && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700">
                {filteredActualites.length} actualité(s) trouvée(s) pour "{searchTerm}"
              </p>
            </div>
          )}

          {/* Liste des actualités */}
          {filteredActualites.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">
                {searchTerm ? 'Aucune actualité trouvée' : 'Aucune actualité pour le moment'}
              </div>
              <p className="text-gray-400">
                {searchTerm 
                  ? 'Essayez avec d\'autres termes de recherche'
                  : 'Les actualités apparaîtront ici une fois publiées.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredActualites.map((actualite) => {
                const isExpanded = expandedImages[actualite.id];
                const imagesToShow = isExpanded 
                  ? actualite.images 
                  : actualite.images?.slice(0, 3);
                const remainingImages = actualite.images?.length - 3;

                return (
                  <div 
                    key={actualite.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden border"
                  >
                    {/* En-tête avec photo, nom et rôle du créateur */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center space-x-4">
                        {/* Photo du créateur */}
                        <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-blue-500">
                          {actualite.createur_photo ? (
                            <img 
                              src={buildImageUrl(actualite.createur_photo)} 
                              alt={actualite.createur_nom_complet || 'Créateur'}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          
                          {/* Initiale si pas de photo ou photo en erreur */}
                          <div 
                            className={`w-full h-full flex items-center justify-center text-white font-medium text-lg ${
                              actualite.createur_photo ? 'hidden' : 'flex'
                            }`}
                          >
                            {actualite.createur_nom_complet 
                              ? actualite.createur_nom_complet.charAt(0).toUpperCase()
                              : 'A'
                            }
                          </div>
                        </div>
                        
                        {/* Nom et rôle du créateur */}
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {actualite.createur_nom_complet || 'Administrateur'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {actualite.createur_role || 'Administrateur'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Date de création */}
                      <div className="mt-2 text-sm text-gray-500">
                       Publié le : {formatDate(actualite.date_creation)}
                      </div>
                    </div>

                    {/* Contenu de l'actualité */}
                    <div className="p-6">
                      {/* Titre de l'article */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {actualite.titre}
                      </h2>
                      
                      {/* Contenu texte */}
                      <div className="prose max-w-none text-gray-700 mb-6">
                        {actualite.contenu && actualite.contenu.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Images - Affichage selon le nombre */}
                      {actualite.images && actualite.images.length > 0 && (
                        <div className="mt-6">
                          {/* Grille d'images */}
                          <div className={`grid gap-4 ${
                            imagesToShow.length === 1 ? 'grid-cols-1' : 
                            imagesToShow.length === 2 ? 'grid-cols-2' : 
                            'grid-cols-3'
                          }`}>
                            {imagesToShow.map((image, index) => (
                              <div key={index} className="relative group">
                                <img 
                                  src={buildImageUrl(image)} 
                                  alt={`${actualite.titre} - Image ${index + 1}`}
                                  className={`w-full rounded-lg shadow-sm cursor-pointer hover:opacity-90 transition-opacity ${
                                    imagesToShow.length === 1 
                                      ? 'h-auto max-h-96 object-contain' 
                                      : 'h-48 object-cover'
                                  }`}
                                  onClick={() => openImageModal(actualite.images, index)}
                                  onError={(e) => {
                                    console.error('❌ Erreur chargement image:', image);
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                
                                {/* Placeholder si l'image ne charge pas */}
                                <div 
                                  className="hidden w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"
                                  style={{ display: 'none' }}
                                >
                                  <span className="text-sm">Image {index + 1}</span>
                                </div>

                                {/* Badge +X pour la dernière image quand il y a plus de 3 images */}
                                {!isExpanded && index === 2 && remainingImages > 0 && (
                                  <div 
                                    className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center cursor-pointer"
                                    onClick={() => toggleExpandImages(actualite.id)}
                                  >
                                    <span className="text-white text-2xl font-bold">
                                      +{remainingImages}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Bouton pour réduire les images si elles sont étendues */}
                          {isExpanded && actualite.images.length > 3 && (
                            <div className="text-center mt-4">
                              <button
                                onClick={() => toggleExpandImages(actualite.id)}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                              >
                                Voir moins d'images
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bouton de rafraîchissement */}
          <div className="text-center mt-12">
            <button
              onClick={fetchActualites}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Actualiser les actualités
            </button>
          </div>
        </div>
      </div>

      {/* Modal pour afficher les images en grand */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 z-10"
              onClick={closeImageModal}
            >
              ✕
            </button>

            {/* Image */}
            <div className="flex items-center justify-center">
              <img 
                src={buildImageUrl(selectedImage[currentImageIndex])} 
                alt={`Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>

            {/* Navigation si plusieurs images */}
            {selectedImage.length > 1 && (
              <>
                {/* Bouton précédent */}
                <button
                  className={`absolute -left-17 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 ${
                    currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                >
                   <img
                src="/image.png"
                alt="Précédent"
                className="w-14 h-13 cursor-pointer ml-17"
              />
                </button>

                {/* Bouton suivant */}
                <button
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 ${
                    currentImageIndex === selectedImage.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={nextImage}
                  disabled={currentImageIndex === selectedImage.length - 1}
                >
                   <img
                src="/next.png"
                alt="Suivant"
                className="w-14 h-13 cursor-pointer"
              />
                </button>

                {/* Compteur d'images */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {selectedImage.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}