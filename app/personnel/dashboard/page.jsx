// app/personnel/dashboard/page.js
'use client';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { useAuth } from '../../../contexts/AuthContext';
import CreateArticleModal from '../../../components/CreateArticleModal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Import des icônes Material UI
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PieChartIcon from '@mui/icons-material/PieChart';

import './Dashboard.css';

export default function PersonnelDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [articleSubmenuOpen, setArticleSubmenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    { name: 'Profil', icon: <PersonIcon /> },
    { name: 'Gerer campagne', icon: <CampaignIcon /> },
    { name: 'Parametre', icon: <SettingsIcon /> },
    { name: 'Deconnexion', icon: <LogoutIcon />, isLogout: true }
  ];

  // Fonction pour récupérer les articles
  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/actualites', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des articles');
      }
      
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

  // Fonction pour supprimer un article
  const deleteArticle = async (articleId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
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

      const data = await response.json();
      
      if (data.success) {
        alert('Article supprimé avec succès !');
        fetchArticles();
      } else {
        alert('Erreur lors de la suppression: ' + data.message);
      }
    } catch (error) {
      console.error('Erreur deleteArticle:', error);
      alert('Erreur lors de la suppression');
    }
  };


  // Gardez seulement UNE déclaration de handleMenuClick - supprimez la deuxième
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
  } else {
    setActiveMenu(item.name);
    setArticleSubmenuOpen(false);
    setShowArticleModal(false);
  }
};

// useEffect pour fermeture automatique
useEffect(() => {
  if (activeMenu !== 'Créer article' && showArticleModal) {
    setShowArticleModal(false);
  }
}, [activeMenu, showArticleModal]);

// Supprimez cette deuxième déclaration qui cause l'erreur :
// const handleMenuClick = (item) => { ... }
  // Fonction de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Recherche pour: ${searchQuery}`);
    }
  };

 

  const handleSubmenuClick = (subItem) => {
    setActiveMenu(subItem.name);
    if (subItem.name === 'Créer article') {
      setShowArticleModal(true);
    } else if (subItem.name === 'Liste articles') {
      setActiveMenu('Liste articles');
    }
  };

  useEffect(() => {
    if (activeMenu === 'Liste articles') {
      fetchArticles();
    }
  }, [activeMenu]);

  // Fonction pour afficher le contenu en fonction du menu actif
  const renderContent = () => {
    switch(activeMenu) {
      case 'Dashboard':
        return (
          <div className="dashboard-content">
            {/* Statistiques rapides */}
            <div className="stats-grid">
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
                <div className="stat-value">85%</div>
                <div className="stat-change positive">+5% ce mois</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <PieChartIcon />
                </div>
                <h3>Engagement</h3>
                <div className="stat-value">1.2K</div>
                <div className="stat-change positive">+12% cette semaine</div>
              </div>
            </div>

            {/* Diagrammes */}
            <div className="charts-section">
              <div className="chart-card large">
                <h3>Activité des Articles</h3>
                <div className="chart-placeholder">
                  <BarChartIcon style={{ fontSize: 48, color: '#64748b' }} />
                  <p>Diagramme en barres - Activité mensuelle</p>
                </div>
              </div>
              
              <div className="chart-card">
                <h3>Statistiques</h3>
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
                            href={`/articles/${article.id}`}
                            className="action-link view"
                          >
                            Voir détails
                          </Link>
                          <div className="action-buttons">
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

      case 'Gerer campagne':
        return (
          <div className="campaign-section">
            <h2>Gérer les Campagnes</h2>
            <p>Interface de gestion des campagnes à venir...</p>
          </div>
        );

      case 'Parametre':
        return (
          <div className="settings-section">
            <h2>Paramètres</h2>
            <p>Configuration des paramètres utilisateur...</p>
          </div>
        );

      default:
        return (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Bienvenue</h3>
                <div className="stat-value">Tableau de bord</div>
                <div className="stat-change">Sélectionnez une option dans le menu</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <ProtectedRoute requiredRole="personnel" requireValidation={true}>
      <div className="dashboard">
        {/* Header horizontal en haut */}
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
            placeholder="Rechercher des articles..." 
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
        {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
      </div>
      <div className="user-info">
        <div className="user-name">{user?.prenom} {user?.nom}</div>
        <div className="user-role">{user?.role}</div>
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
                          {articleSubmenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </span>
                      )}
                    </button>
                    
                    {/* Sous-menu pour Articles */}
                    {item.hasSubmenu && articleSubmenuOpen && (
                      <ul className="submenu">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name} className="submenu-item">
                            <button
                              className={`submenu-link ${activeMenu === subItem.name ? 'active' : ''}`}
                              onClick={() => handleSubmenuClick(subItem)}
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

        {/* Modal de création d'article */}
        <CreateArticleModal
          isOpen={showArticleModal}
          onClose={() => setShowArticleModal(false)}
          onArticleCreated={() => {
            alert('Article créé avec succès !');
            fetchArticles();
            if (activeMenu === 'Liste articles') {
              setActiveMenu('Liste articles');
            }
          }}
        />
      </div>
    </ProtectedRoute>
  );
}