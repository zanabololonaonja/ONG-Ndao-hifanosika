'use client';
import { useState, useRef } from 'react';

export default function CreateArticleModal({ isOpen, onClose, onArticleCreated }) {
  const [formData, setFormData] = useState({
    titre: '',
    contenu: '',
    statut: 'brouillon'
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  // Gestion de la sélection des fichiers
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    // Vérifier le nombre d'images
    if (images.length + files.length > 10) {
      alert('❌ Maximum 10 images autorisées');
      return;
    }

    // Vérifier la taille et le type des fichiers
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`❌ L'image ${file.name} est trop volumineuse (max 5MB)`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        alert(`❌ Le fichier ${file.name} n'est pas une image valide`);
        return false;
      }
      return true;
    });

    // Ajouter les nouveaux fichiers
    const newImages = [...images, ...validFiles];
    setImages(newImages);

    // Créer les previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });

    // Réinitialiser l'input file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Supprimer une image
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  // Upload des images vers le serveur
  const uploadImages = async (token) => {
    if (images.length === 0) return [];

    const uploadedUrls = [];
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      
      try {
        setUploadProgress(prev => ({ ...prev, [i]: 0 }));
        
        const formData = new FormData();
        formData.append('images', image);
        formData.append('articleId', 'temp'); // ID temporaire, sera mis à jour après création de l'article

        const response = await fetch('http://localhost:5000/api/upload/article-images', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error(`Erreur upload image ${i + 1}`);
        }

        const data = await response.json();
        
        if (data.success && data.images && data.images.length > 0) {
          uploadedUrls.push(data.images[0].url);
          setUploadProgress(prev => ({ ...prev, [i]: 100 }));
        }
      } catch (error) {
        console.error(`❌ Erreur upload image ${i + 1}:`, error);
        throw error;
      }
    }

    return uploadedUrls;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titre.trim() || !formData.contenu.trim()) {
      alert('❌ Veuillez remplir le titre et le contenu');
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('❌ Erreur: Vous devez être connecté');
        return;
      }

      console.log('📸 Upload des images...');
      const imageUrls = await uploadImages(token);

      console.log('✅ Images uploadées:', imageUrls);

      const payload = {
        titre: formData.titre,
        contenu: formData.contenu,
        images: imageUrls, // Tableau d'URLs d'images
        statut: formData.statut
      };

      console.log('📦 Payload envoyé:', payload);

      const response = await fetch('http://localhost:5000/api/actualites', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('❌ Erreur parsing JSON:', parseError);
        alert('❌ Réponse invalide du serveur');
        return;
      }

      if (data.success) {
        alert('✅ Article créé avec succès !');
        // Réinitialiser le formulaire
        setFormData({ titre: '', contenu: '', statut: 'brouillon' });
        setImages([]);
        setImagePreviews([]);
        setUploadProgress({});
        onArticleCreated();
        onClose();
      } else {
        alert(`❌ Erreur: ${data.message || 'Erreur inconnue'}`);
      }

    } catch (error) {
      console.error('💥 Erreur complète:', error);
      alert('❌ Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
 <div className="fixed inset-0 flex items-start justify-end p-6 z-50 top-15">
  <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto mt-12 mr-4 ">
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800">Créer un article</h3>
        <button 
          type="button" 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700 text-xl p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Titre */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">Titre *</label>
          <input
            type="text"
            required
            value={formData.titre}
            onChange={(e) => setFormData({...formData, titre: e.target.value})}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Titre de l'article..."
          />
        </div>

        {/* Upload d'images */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-4">
            Images de l'article ({images.length}/10 maximum)
          </label>
          
          {/* Bouton d'upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg"
            >
              <span className="mr-3 text-xl">📷</span>
              Sélectionner des images
            </label>
            <p className="text-base text-gray-500 mt-3">
              Formats supportés: JPG, PNG, GIF, WebP (max 5MB par image)
            </p>
          </div>

          {/* Prévisualisation des images */}
          {imagePreviews.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-700 mb-4">
                Images sélectionnées ({imagePreviews.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {imagePreviews.map((preview, index) => (
                  <div key={preview.id} className="relative group">
                    <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-200">
                      <img
                        src={preview.url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-2 transition-opacity text-lg"
                      >
                        ❌
                      </button>
                    </div>
                    {uploadProgress[index] !== undefined && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gray-200 h-2 rounded-b-xl">
                        <div 
                          className="bg-blue-500 h-2 transition-all duration-300 rounded-b-xl"
                          style={{ width: `${uploadProgress[index]}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">Contenu *</label>
          <textarea
            required
            rows="12"
            value={formData.contenu}
            onChange={(e) => setFormData({...formData, contenu: e.target.value})}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Contenu de l'article..."
          />
        </div>

        {/* Statut */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">Statut</label>
          <select
            value={formData.statut}
            onChange={(e) => setFormData({...formData, statut: e.target.value})}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="brouillon">Brouillon</option>
            <option value="publie">Publier immédiatement</option>
          </select>
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3 text-lg text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading || images.some((_, index) => uploadProgress[index] < 100 && uploadProgress[index] > 0)}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors text-lg"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Création en cours...
              </>
            ) : (
              'Créer l\'article'
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}