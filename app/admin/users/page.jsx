'use client';
import { useAuth } from '../../../contexts/AuthContext';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Composant UserStatusDropdown intégré directement
const UserStatusDropdown = ({ user, onStatusUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(user.statut);

  const handleStatusChange = async (newStatus) => {
    try {
      setIsLoading(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${user.id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ statut: newStatus })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCurrentStatus(newStatus);
        onStatusUpdate(user.id, newStatus);
        alert('Statut mis à jour avec succès!');
      } else {
        alert('Erreur: ' + data.message);
      }
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'actif': return 'bg-green-100 text-green-800 border-green-300';
      case 'inactif': return 'bg-red-100 text-red-800 border-red-300';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="relative">
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={isLoading}
        className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(currentStatus)} ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <option value="actif">Actif</option>
        <option value="inactif">Inactif</option>
        <option value="en_attente">En attente</option>
      </select>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-full">
          <div className="w-3 h-3 border-2 border-blue-500 borsder-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

function UsersListContent() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState(false);

  // Récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log('📊 Utilisateurs reçus:', data);
      
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      alert('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusUpdate = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, statut: newStatus } : user
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Liste des Utilisateurs
              </h1>
              <p className="text-gray-600 mt-2">
                Gestion complète des utilisateurs
              </p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/admin/dashboard"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Retour au Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800">Total</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{users.length}</p>
            <p className="text-gray-600">Utilisateurs</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800">Admins</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {users.filter(u => u.role === 'admin').length}
            </p>
            <p className="text-gray-600">Administrateurs</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800">Personnel</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {users.filter(u => u.role === 'personnel').length}
            </p>
            <p className="text-gray-600">Membres</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800">Donateurs</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {users.filter(u => u.role === 'donateur').length}
            </p>
            <p className="text-gray-600">Donateurs/Visiteurs</p>
          </div>
        </div>

        {/* Contrôles */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Liste des Utilisateurs ({users.length})
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPasswords(!showPasswords)}
                className={`px-4 py-2 rounded-lg ${
                  showPasswords 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-500 hover:bg-gray-600 text-white'
                }`}
              >
                {showPasswords ? '🔒 Cacher MDP' : '🔓 Afficher MDP'}
              </button>
              <button
                onClick={fetchUsers}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Actualiser
              </button>
            </div>
          </div>
        </div>

        {/* Tableau des utilisateurs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom & Prénom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Téléphone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Création
                  </th>
                  {showPasswords && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mot de Passe
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((userItem, index) => (
                  <tr key={userItem.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {userItem.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {userItem.prenom} {userItem.nom}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {userItem.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {userItem.telephone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        userItem.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        userItem.role === 'personnel' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {userItem.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <UserStatusDropdown 
                        user={userItem} 
                        onStatusUpdate={handleStatusUpdate}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(userItem.date_creation).toLocaleDateString('fr-FR')}
                    </td>
                    {showPasswords && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-red-600 bg-red-50">
                        {userItem.password}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Avertissement sécurité */}
        {showPasswords && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>⚠️ ATTENTION SÉCURITÉ :</strong> L'affichage des mots de passe en clair est une mauvaise pratique. 
            Les mots de passe devraient toujours être hashés et jamais affichés.
          </div>
        )}
      </div>
    </div>
  );
}

export default function UsersList() {
  return (
    <ProtectedRoute requiredRole="admin">
      <UsersListContent />
    </ProtectedRoute>
  );
}