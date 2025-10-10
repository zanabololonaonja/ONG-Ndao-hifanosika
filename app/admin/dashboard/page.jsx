'use client';
import { useAuth } from '../../../contexts/AuthContext';
import ProtectedRoute from '../../../components/ProtectedRoute';
import CreateArticleModal from '../../../components/CreateArticleModal';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './Dashboard.css';

// Import des icônes Material UI
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PieChartIcon from '@mui/icons-material/PieChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function AdminDashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [articles, setArticles] = useState([]);
  const [showArticleModal, setShowArticleModal] = useState(false);
  
  // États pour le layout
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [articleSubmenuOpen, setArticleSubmenuOpen] = useState(false);
  const [userSubmenuOpen, setUserSubmenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [photoError, setPhotoError] = useState(false);

  // Menu spécifique pour admin
  const menuItems = [
    { 
      name: 'Article', 
      icon: <ArticleIcon />, 
      hasSubmenu: true,
      submenu: [
        { name: 'Liste articles', icon: <ListIcon /> },
        { name: 'Créer article', icon: <AddIcon /> }
      ]
    },
    { 
      name: 'Utilisateurs', 
      icon: <PeopleIcon />, 
      hasSubmenu: true,
      submenu: [
        { name: 'Valider comptes', icon: <CheckCircleIcon /> },
        { name: 'Liste utilisateurs', icon: <ListIcon /> }
      ]
    },
    { name: 'Profil', icon: <PersonIcon /> },
    { name: 'Parametre', icon: <SettingsIcon /> },
    { name: 'Deconnexion', icon: <LogoutIcon />, isLogout: true }
  ];

  // Récupérer les utilisateurs en attente
  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/users/pending', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setPendingUsers(data.users || []);
      }
    } catch (error) {
      console.error('Erreur fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les articles
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/actualites', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setArticles(data.actualites);
      }
    } catch (error) {
      console.error('Erreur fetchArticles:', error);
    } finally {
      setLoading(false);
    }
  };

 

  // Activer un utilisateur
  const activateUser = async (userId, userName) => {
    setActionLoading(userId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/validate`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        alert(`✅ ${userName} a été activé avec succès !`);
        fetchPendingUsers();
      } else {
        alert(`❌ Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error('Erreur activation:', error);
      alert('❌ Erreur lors de l\'activation');
    } finally {
      setActionLoading(null);
    }
  };

  // Désactiver/Refuser un utilisateur
  const deactivateUser = async (userId, userName) => {
    if (!confirm(`Êtes-vous sûr de vouloir refuser l'accès à ${userName} ?`)) {
      return;
    }

    setActionLoading(userId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        alert(`❌ ${userName} a été refusé.`);
        fetchPendingUsers();
      } else {
        alert(`❌ Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error('Erreur désactivation:', error);
      alert('❌ Erreur lors du refus');
    } finally {
      setActionLoading(null);
    }
  };

  // Fonction de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Recherche pour: ${searchQuery}`);
    }
  };



  // Fonction pour supprimer un article
const deleteArticle = async (articleId) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.')) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/actualites/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Vérifier d'abord si la réponse est OK
    if (!response.ok) {
      let errorMessage = `Erreur ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        const textError = await response.text();
        errorMessage = textError || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Parser le JSON seulement si la réponse est OK
    const data = await response.json();

    if (data.success) {
      alert('✅ Article supprimé avec succès !');
      // Recharger la liste des articles
      fetchArticles();
    } else {
      alert('❌ Erreur lors de la suppression: ' + data.message);
    }
  } catch (error) {
    console.error('❌ Erreur deleteArticle:', error);
    alert('❌ Erreur lors de la suppression: ' + error.message);
  }
};
  // Gestion des clics sur le menu
  const handleMenuClick = (item) => {
    if (item.isLogout) {
      logout();
      return;
    }

    if (item.name === 'Profil') {
      router.push('/profil');
      return;
    }

    if (item.name === 'Article') {
      setArticleSubmenuOpen(!articleSubmenuOpen);
      setUserSubmenuOpen(false);
    } else if (item.name === 'Utilisateurs') {
      setUserSubmenuOpen(!userSubmenuOpen);
      setArticleSubmenuOpen(false);
    } else {
      setActiveMenu(item.name);
      setArticleSubmenuOpen(false);
      setUserSubmenuOpen(false);
    }
  };


// publier brouilon
  const publishArticle = async (articleId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/actualites/${articleId}/publish`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      let errorMessage = `Erreur ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        const textError = await response.text();
        errorMessage = textError || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (data.success) {
      alert('✅ Article publié avec succès !');
      fetchArticles(); // Recharger la liste
    } else {
      alert('❌ Erreur lors de la publication: ' + data.message);
    }
  } catch (error) {
    console.error('❌ Erreur publishArticle:', error);
    alert('❌ Erreur lors de la publication: ' + error.message);
  }
};
  // Gestion des sous-menus
  const handleSubmenuClick = (subItem, parent) => {
    setActiveMenu(subItem.name);
    if (subItem.name === 'Créer article') {
      setShowArticleModal(true);
    } else if (subItem.name === 'Valider comptes') {
      setShowModal(true);
    } else if (subItem.name === 'Liste utilisateurs') {
      router.push('/admin/users');
    } else if (subItem.name === 'Liste articles') {
      // Rien de spécial à faire, le useEffect s'occupera de fetchArticles
    }
  };

  useEffect(() => {
    fetchPendingUsers();
    if (activeMenu === 'Liste articles') {
      fetchArticles();
    }
  }, [activeMenu]);

  // Contenu en fonction du menu actif
  const renderContent = () => {
    switch(activeMenu) {
      case 'Dashboard':
        return (
          <div className="dashboard-content">
            {/* Statistiques rapides */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <PeopleIcon />
                </div>
                <h3>Comptes en attente</h3>
                <div className="stat-value">{pendingUsers.length}</div>
                <div className="stat-change warning">À valider</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <BarChartIcon />
                </div>
                <h3>Articles créés</h3>
                <div className="stat-value">{articles.length}</div>
                <div className="stat-change positive">+{articles.length} au total</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <TrendingUpIcon />
                </div>
                <h3>Performance</h3>
                <div className="stat-value">92%</div>
                <div className="stat-change positive">+8% ce mois</div>
              </div>
            </div>

            {/* Diagrammes */}
            <div className="charts-section">
              <div className="chart-card large">
                <h3>Activité du Système</h3>
                <div className="chart-placeholder">
                  <BarChartIcon style={{ fontSize: 48, color: '#64748b' }} />
                  <p>Diagramme en barres - Activité administrative</p>
                </div>
              </div>
              
              <div className="chart-card">
                <h3>Statistiques Utilisateurs</h3>
                <div className="chart-placeholder">
                  <PieChartIcon style={{ fontSize: 48, color: '#64748b' }} />
                  <p>Diagramme circulaire - Répartition</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Liste articles':
        return (
          <div className="articles-section">
            <div className="section-header">
              <h2>Liste des Articles</h2>
              <button
                onClick={() => setShowArticleModal(true)}
                className="create-article-btn"
              >
                <AddIcon />
                <span>Nouvel Article</span>
              </button>
            </div>

            <div className="articles-content">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Chargement des articles...</p>
                </div>
              ) : articles.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <h3>Aucun article créé</h3>
                  <p>Commencez par créer votre premier article !</p>
                  <button
                    onClick={() => setShowArticleModal(true)}
                    className="create-article-btn primary"
                  >
                    Créer un article
                  </button>
                </div>
              ) : (
                <div className="articles-grid">
  {articles.map((article) => (
    <div key={article.id} className="article-card">
      {article.image_url && (
        <img 
          src={article.image_url} 
          alt={article.titre}
          className="article-image"
        />
      )}
      <div className="article-content">
        <h3 className="article-title">{article.titre}</h3>
        <p className="article-excerpt">{article.contenu}</p>
        <div className="article-meta">
          <span className="article-date">
            {new Date(article.date_creation).toLocaleDateString('fr-FR')}
          </span>
          <span className={`article-status ${article.statut}`}>
            {article.statut}
          </span>
        </div>
        <div className="article-actions">
          <Link 
            href={`/actualites/${article.id}`}  // Modification ici pour rediriger vers la page de détail
            className="action-link view"
          >
            Voir détails
          </Link>
          <div className="action-buttons">
            {/* Bouton Publier conditionnel */}
            {article.statut === 'brouillon' && (
              <button
                onClick={() => publishArticle(article.id)}
                className="action-link publish"
              >
                Publier
              </button>
            )}
            <Link 
              href={`/articles/edit/${article.id}`}
              className="action-link edit"
            >
              Modifier
            </Link>
            <button
              onClick={() => deleteArticle(article.id)}
              className="action-link delete"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
              )}
            </div>
          </div>
        );

 
       
    }
  };

  return (
    <div className="dashboard">
      {/* Header horizontal en haut */}
      <header className="header">
        <div className="header-left">
    <div className="logo">
        <img
        src="/logoremove.png"
        alt="Logo"
        className="h-20 fixed -top-1 left-2"
      />
      <h1>Ndao Hifanosika</h1>
    </div>
          <div className="header-center">
            <div className="search-container">
              <button 
                className="menu-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <MenuIcon />
              </button>
              <form onSubmit={handleSearch} className="search-bar">
                <SearchIcon className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <div className="user-profile">
           <div className="user-avatar">
  {user?.photo_profil && !photoError ? (
    <img 
      src={user.photo_profil} 
      alt={`${user.prenom} ${user.nom}`}
      className="w-full h-full rounded-full object-cover"
      onError={() => setPhotoError(true)}
      onLoad={() => console.log('✅ Photo header chargée avec succès')}
    />
  ) : (
    <span className="w-full h-full flex items-center justify-center">
      {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
    </span>
  )}
</div>
            <div className="user-info">
              <div className="user-name">{user?.prenom} {user?.nom}</div>
              <div className="user-role">Administrateur</div>
            </div>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Menu vertical à gauche - Fixe */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <nav className="nav-vertical">
            <ul className="nav-menu-vertical">
              <li className="nav-item-vertical">
                <button
                  className={`nav-link-vertical ${activeMenu === 'Dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveMenu('Dashboard')}
                >
                  <span className="nav-icon"><DashboardIcon /></span>
                  <span className="nav-text">Dashboard</span>
                </button>
              </li>
              
              {menuItems.map((item) => (
                <li key={item.name} className="nav-item-vertical">
                  <button
                    className={`nav-link-vertical ${activeMenu === item.name ? 'active' : ''}`}
                    onClick={() => handleMenuClick(item)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-text">{item.name}</span>
                    {item.hasSubmenu && (
                      <span className="submenu-arrow">
                        {(item.name === 'Article' && articleSubmenuOpen) || 
                         (item.name === 'Utilisateurs' && userSubmenuOpen) ? 
                         <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </span>
                    )}
                  </button>
                  
                  {/* Sous-menu pour Articles */}
                  {item.hasSubmenu && item.name === 'Article' && articleSubmenuOpen && (
                    <ul className="submenu">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name} className="submenu-item">
                          <button
                            className={`submenu-link ${activeMenu === subItem.name ? 'active' : ''}`}
                            onClick={() => handleSubmenuClick(subItem, item.name)}
                          >
                            <span className="nav-icon">{subItem.icon}</span>
                            <span className="nav-text">{subItem.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Sous-menu pour Utilisateurs */}
                  {item.hasSubmenu && item.name === 'Utilisateurs' && userSubmenuOpen && (
                    <ul className="submenu">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name} className="submenu-item">
                          <button
                            className={`submenu-link ${activeMenu === subItem.name ? 'active' : ''}`}
                            onClick={() => handleSubmenuClick(subItem, item.name)}
                          >
                            <span className="nav-icon">{subItem.icon}</span>
                            <span className="nav-text">{subItem.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Contenu principal */}
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="content-header">
            <h1>{activeMenu}</h1>
            <div className="breadcrumb">Accueil / {activeMenu}</div>
          </div>

          {renderContent()}
        </main>
      </div>

      {/* Modal de validation des comptes */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Validation des comptes personnel
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-gray-600 mt-4">Chargement des demandes...</p>
                </div>
              ) : pendingUsers.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-gray-600 text-lg">
                    Aucune demande en attente de validation
                  </p>
                  <p className="text-gray-500">
                    Tous les comptes personnel ont été traités.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUsers.map((user) => (
                    <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">
                                {user.prenom[0]}{user.nom[0]}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">
                                {user.prenom} {user.nom}
                              </h4>
                              <p className="text-gray-600">{user.email}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Téléphone:</span> {user.telephone}
                            </div>
                            <div>
                              <span className="font-medium">Inscrit le:</span> {new Date(user.date_creation).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => activateUser(user.id, `${user.prenom} ${user.nom}`)}
                            disabled={actionLoading === user.id}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-1 disabled:opacity-50"
                          >
                            {actionLoading === user.id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>...</span>
                              </>
                            ) : (
                              <>
                                <span>✓</span>
                                <span>Activer</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => deactivateUser(user.id, `${user.prenom} ${user.nom}`)}
                            disabled={actionLoading === user.id}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-1 disabled:opacity-50"
                          >
                            {actionLoading === user.id ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>...</span>
                              </>
                            ) : (
                              <>
                                <span>✕</span>
                                <span>Refuser</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <CreateArticleModal
        isOpen={showArticleModal}
        onClose={() => setShowArticleModal(false)}
        onArticleCreated={() => {
          alert('Article créé avec succès !');
          fetchArticles();
        }}
      />
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}