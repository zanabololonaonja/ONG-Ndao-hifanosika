'use client';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ 
  children, 
  requiredRole = null,
  requireValidation = false 
}) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // 1. Vérifier si l'utilisateur est connecté
      if (!isAuthenticated()) {
        router.push('/login');
        return;
      }

      // 2. Vérifier le rôle si requis
      if (requiredRole && user?.role !== requiredRole) {
        router.push('/unauthorized');
        return;
      }

      // 3. Vérifier la validation pour le personnel
      if (requireValidation && user?.role === 'personnel' && user?.statut !== 'actif') {
        router.push('/pending-validation');
        return;
      }
    }
  }, [user, loading, requiredRole, requireValidation, router]);

  // Afficher un loading pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Vérification d'accès...</div>
      </div>
    );
  }

  // Ne rien afficher si non autorisé (la redirection se fait dans useEffect)
  if (!isAuthenticated() || (requiredRole && user?.role !== requiredRole)) {
    return null;
  }

  return children;
}