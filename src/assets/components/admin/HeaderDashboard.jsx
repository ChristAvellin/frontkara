// Header Component
import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';

export default function Header({ activeTab, viewMode, setViewMode, searchTerm, setSearchTerm, onAddClick }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#3a5157] to-[#Face6b] bg-clip-text text-transparent capitalize">
            {activeTab}
          </h2>
          <p className="text-gray-600 mt-1">
            {activeTab === 'dashboard' && 'Vue d\'ensemble de votre plateforme'}
            {activeTab === 'songs' && 'Gérez votre bibliothèque musicale'}
            {activeTab === 'artists' && 'Gérez vos artistes'}
            {activeTab === 'users' && 'Gérez les utilisateurs'}
            {activeTab === 'settings' && 'Configurez votre plateforme'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {(activeTab === 'songs' || activeTab === 'artists') && (
            <>
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-sm text-[#3a5157]' 
                      : 'text-gray-600 hover:text-[#3a5157]'
                  }`}
                >
                  <Grid3X3 size={16} className="mr-2" />
                  Grille
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-[#3a5157]' 
                      : 'text-gray-600 hover:text-[#3a5157]'
                  }`}
                >
                  <List size={16} className="mr-2" />
                  Liste
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#Face6b] transition-all w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </>
          )}

          {(activeTab === 'songs' || activeTab === 'artists') && (
            <button 
              onClick={onAddClick}
              className="flex items-center bg-gradient-to-r from-[#3a5157] to-[#2a3d42] text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 w-full sm:w-auto"
            >
              <Plus className="mr-2" size={18} />
              Ajouter {activeTab === 'songs' ? 'une chanson' : 'un artiste'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}