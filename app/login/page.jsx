'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import './login.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    telephone: '',
    role: 'donateur'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      if (isLogin) {
        // Connexion
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        console.log('🔐 Réponse login:', data);

        if (response.ok && data.success) {
          // ✅ CORRECTION: Appeler login avec le token et les données utilisateur
          // L'AuthContext va automatiquement normaliser l'URL de la photo
          login(data.token, data.user);
          
          console.log('✅ Login réussi - Redirection:', data.user.role);
          
          // Redirection selon le rôle
          switch(data.user.role) {
            case 'admin':
              router.push('/admin/dashboard');
              break;
            case 'personnel':
              if (data.user.statut === 'actif') {
                router.push('/personnel/dashboard');
              } else {
                router.push('/pending-validation');
              }
              break;
            default:
              router.push('/');
          }
        } else {
          setMessage(data.message || 'Erreur de connexion');
        }
      } else {
        // Inscription
        const response = await fetch(`${API_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        console.log('🔐 Réponse inscription:', data);

        if (response.ok) {
          setMessage(data.message);
          if (data.success) {
            // ✅ CORRECTION: Après inscription réussie, connecter automatiquement
            if (data.token && data.user) {
              login(data.token, data.user);
              
              // Redirection après inscription
              if (data.user.role === 'personnel' && data.user.statut !== 'actif') {
                router.push('/pending-validation');
              } else {
                router.push('/');
              }
            } else {
              // Si pas de connexion auto, passer en mode login
              setIsLogin(true);
            }
          }
        } else {
          setMessage(data.message || "Erreur d'inscription");
        }
      }
    } catch (error) {
      console.error('❌ Erreur auth:', error);
      setMessage('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
        
        {message && (
          <div className={`message ${message.includes('succès') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Téléphone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="donateur">Donateur/Visiteur</option>
                  <option value="personnel">Personnel</option>
                </select>
                <small>
                  {formData.role === 'personnel' && 
                    "Votre compte devra être validé par l'administrateur"}
                </small>
              </div>
            </>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
          </button>
        </form>

        <div className="switch-mode">
          <p>
            {isLogin ? "Vous n'avez pas de compte ? " : "Vous avez déjà un compte ? "}
            <span onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}>
              {isLogin ? "S'inscrire" : 'Se connecter'}
            </span>
          </p>
        </div>

        <div className="roles-info">
          <h4>Informations sur les rôles :</h4>
          <ul>
            <li><strong>Admin :</strong> Accès complet (créé manuellement)</li>
            <li><strong>Personnel :</strong> Inscription + validation admin requise</li>
            <li><strong>Donateur/Visiteur :</strong> Accès immédiat après inscription</li>
          </ul>
        </div>
      </div>
    </div>
  );
}