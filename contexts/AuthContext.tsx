'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: 'admin' | 'personnel' | 'donateur';
  statut?: 'actif' | 'en_attente' | 'inactif';
  telephone?: string;
  photo_profil?: string;
  date_creation?: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  isPersonnel: () => boolean;
  isDonateur: () => boolean;
  isPersonnelValide: () => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ FONCTION CRITIQUE: Construire l'URL complète de l'image
  const buildImageUrl = (imagePath: string | undefined): string => {
    if (!imagePath) return '';
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Si c'est déjà une URL complète, la retourner telle quelle
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Si c'est un chemin relatif, construire l'URL complète
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    const fullUrl = `${API_URL}${normalizedPath}`;
    
    console.log('🔄 Construction URL image:', { original: imagePath, normalized: fullUrl });
    return fullUrl;
  };

  // ✅ FONCTION CRITIQUE: Normaliser les données utilisateur
  const normalizeUserData = (userData: User): User => {
    const normalizedUser = {
      ...userData,
      photo_profil: buildImageUrl(userData.photo_profil)
    };
    
    console.log('🔄 Normalisation utilisateur:', {
      id: userData.id,
      photoOriginal: userData.photo_profil,
      photoNormalized: normalizedUser.photo_profil
    });
    
    return normalizedUser;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // ✅ CORRECTION: Toujours récupérer les données fraîches du serveur
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('🔄 Vérification auth - Statut:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('🔄 Données serveur:', data);
        
        if (data.success) {
          // ✅ CORRECTION: Normaliser les données avec l'URL complète
          const normalizedUser = normalizeUserData(data.user);
          console.log('✅ Utilisateur normalisé:', normalizedUser);
          
          setUser(normalizedUser);
          localStorage.setItem('user', JSON.stringify(normalizedUser));
        } else {
          console.log('❌ Données invalides, déconnexion');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        console.log('❌ Erreur serveur, déconnexion');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('❌ Erreur vérification auth:', error);
      // En cas d'erreur réseau, utiliser le localStorage mais avec normalisation
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          // ✅ Même le localStorage doit être normalisé
          const normalizedUser = normalizeUserData(parsedUser);
          console.log('📦 Utilisateur depuis localStorage (normalisé):', normalizedUser);
          setUser(normalizedUser);
        } catch (parseError) {
          console.error('❌ Error parsing user data:', parseError);
          localStorage.removeItem('user');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (token: string, userData: User) => {
    console.log('🔐 Login - Données reçues:', userData);
    
    // ✅ CORRECTION: Normaliser AVANT de stocker
    const normalizedUser = normalizeUserData(userData);
    console.log('🔐 Login - Données normalisées:', normalizedUser);
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    setUser(normalizedUser);
  };

  const logout = () => {
    console.log('🚪 Logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      console.log('🔄 Update user - Données reçues:', userData);
      
      // ✅ CORRECTION: S'assurer que la photo a l'URL complète
      const updatedUserData = {
        ...userData,
        photo_profil: userData.photo_profil ? buildImageUrl(userData.photo_profil) : userData.photo_profil
      };
      
      const updatedUser = { ...user, ...updatedUserData };
      console.log('🔄 Update user - Données finales:', updatedUser);
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isPersonnel = () => {
    return user?.role === 'personnel';
  };

  const isDonateur = () => {
    return user?.role === 'donateur';
  };

  const isPersonnelValide = () => {
    return user?.role === 'personnel' && user?.statut === 'actif';
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateUser,
      isAuthenticated,
      isAdmin,
      isPersonnel,
      isDonateur,
      isPersonnelValide,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};