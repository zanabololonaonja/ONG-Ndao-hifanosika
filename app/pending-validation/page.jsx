'use client';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PendingValidation() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else if (user?.statut === 'actif' && user?.role === 'personnel') {
      router.push('/personnel/dashboard');
    }
  }, [user, isAuthenticated, router]);

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2>En attente de validation</h2>
      <p>Votre compte personnel est en attente de validation par l'administrateur.</p>
      <p>Vous recevrez un email lorsque votre compte sera activé.</p>
    </div>
  );
}