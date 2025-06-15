// Artists Table Component
import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';

export default function ArtistsTable({ artists, onEdit, onDelete }) {
   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedArtists = [...artists].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-[#3a5157] to-[#2a3d42] text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center">
                  Nom
                  {sortConfig.key === 'name' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => requestSort('songsCount')}
              >
                <div className="flex items-center">
                  Chansons
                  {sortConfig.key === 'songsCount' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => requestSort('followers')}
              >
                <div className="flex items-center">
                  Abonnés
                  {sortConfig.key === 'followers' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Statut</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedArtists.map((artist) => (
              <tr key={artist.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-[#3a5157]">{artist.name}</p>
                    {artist.verified && (
                      <Award className="text-[#Face6b]" size={16} />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{artist.songsCount}</td>
                <td className="px-6 py-4 text-gray-600">{artist.followers.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    artist.verified 
                      ? 'bg-[#Face6b]/20 text-[#3a5157]' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {artist.verified ? 'Vérifié' : 'Non vérifié'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => onEdit(artist)}
                      className="p-2 rounded-full hover:bg-[#Face6b]/10 text-[#3a5157] hover:text-[#Face6b] transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(artist.id)}
                      className="p-2 rounded-full hover:bg-red-500/10 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}