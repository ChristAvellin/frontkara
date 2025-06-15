// Header Component
import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';

export default function Header({ activeTab, viewMode, setViewMode, searchTerm, setSearchTerm, onAddClick, isSticky }) {
  return (
    <div className={`header ${isSticky ? 'sticky' : ''}`}>
      <div className="header-content">
        <div className="header-title">
          <h2 className="dashboard-title">
            {activeTab}
          </h2>
          {!isSticky && (<p className="dashboard-subtitle mt-1">
            {activeTab === 'dashboard' && 'Vue d\'ensemble de votre plateforme'}
            {activeTab === 'songs' && 'Gérez votre bibliothèque musicale'}
            {activeTab === 'artists' && 'Gérez vos artistes'}
            {activeTab === 'users' && 'Gérez les utilisateurs'}
            {activeTab === 'settings' && 'Configurez votre plateforme'}
          </p>)}
        </div>

        <div className="header-controls">
          {(activeTab === 'songs' || activeTab === 'artists') && (
            <>
              <div className="view-toggle">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                >
                  <Grid3X3 size={16} className="mr-2" />
                  {!isSticky && "Grille"}
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                >
                  <List size={16} className="mr-2" />
                  {!isSticky && "Liste"}
                </button>
              </div>

              <div className="search-bar">
                  <Search className="search-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Rechercher une chanson ou un artiste..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
            </>
          )}

          {(activeTab === 'songs' || activeTab === 'artists') && (
            <button 
              onClick={onAddClick}
              className="add-button"
            >
              <Plus className="mr-2" size={18} />
             {!isSticky && "Ajouter"} {!isSticky? activeTab === 'songs'? 'une chanson' : 'un artiste':""}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}