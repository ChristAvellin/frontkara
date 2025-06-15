// Artist Card Component
import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';

export default function ArtistCard({ artist, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={artist.image} 
          alt={artist.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        {artist.verified && (
          <div className="absolute top-3 left-3 bg-[#Face6b] text-[#3a5157] text-xs px-2 py-1 rounded-full font-medium flex items-center">
            <Award size={12} className="mr-1" /> Vérifié
          </div>
        )}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex space-x-3">
            <button 
              onClick={() => onEdit(artist)}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Edit className="text-white" size={18} />
            </button>
            <button 
              onClick={() => onDelete(artist.id)}
              className="w-12 h-12 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
            >
              <Trash2 className="text-white" size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#3a5157] truncate">{artist.name}</h3>
          {artist.verified && <Award className="text-[#Face6b]" size={16} />}
        </div>
        <p className="text-gray-600 text-sm mt-1">{artist.songsCount} chansons</p>
        
        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center text-gray-600">
            <Users size={14} className="mr-1" />
            {artist.followers.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}