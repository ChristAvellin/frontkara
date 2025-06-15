// Songs Table Component
import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';

export default function SongsTable({ songs, onEdit, onDelete }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedSongs = [...songs].sort((a, b) => {
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
              <th className="px-6 py-4 text-left text-sm font-semibold">Couverture</th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => requestSort('title')}
              >
                <div className="flex items-center">
                  Titre
                  {sortConfig.key === 'title' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => requestSort('artist')}
              >
                <div className="flex items-center">
                  Artiste
                  {sortConfig.key === 'artist' && (
                    sortConfig.direction === 'asc' ? <ChevronUp className="ml-1" size={16} /> : <ChevronDown className="ml-1" size={16} />
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Durée</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Langue</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Stats</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedSongs.map((song) => (
              <tr key={song.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={song.image} 
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-y-1 flex-col sm:flex-row sm:space-y-0 sm:space-x-2">
                    <p className="font-semibold text-[#3a5157]">{song.title}</p>
                    {song.trending && (
                      <span className="inline-flex items-center text-xs text-red-500 font-medium">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">{song.artist}</td>
                <td className="px-6 py-4 text-gray-600">{song.duration}</td>
                <td className="px-6 py-4">
                  <span className="bg-[#Face6b]/20 text-[#3a5157] px-3 py-1 rounded-full text-sm font-medium">
                    {song.language}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Play size={14} className="mr-1" />
                      {song.plays}
                    </div>
                    <div className="flex items-center text-red-500">
                      <Heart size={14} className="mr-1" />
                      {song.likes}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => onEdit(song)}
                      className="p-2 rounded-full hover:bg-[#Face6b]/10 text-[#3a5157] hover:text-[#Face6b] transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(song.id)}
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