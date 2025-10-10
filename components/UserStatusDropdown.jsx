'use client';
import { useState } from 'react';

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

  const getStatusText = (status) => {
    switch (status) {
      case 'actif': return 'Actif';
      case 'inactif': return 'Inactif';
      case 'en_attente': return 'En attente';
      default: return status;
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
          <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default UserStatusDropdown;