// Song Card Component
import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';

export default function SongCard({ song, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={song.image} 
          alt={song.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        {song.trending && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            🔥 Trending
          </div>
        )}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex space-x-3">
            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Play className="text-white ml-1" size={20} />
            </button>
            <button 
              onClick={() => onEdit(song)}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Edit className="text-white" size={18} />
            </button>
            <button 
              onClick={() => onDelete(song.id)}
              className="w-12 h-12 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
            >
              <Trash2 className="text-white" size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-[#3a5157] truncate">{song.title}</h3>
        <p className="text-gray-600 text-sm truncate">{song.artist}</p>
        
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded-full">{song.language}</span>
          <span>{song.duration}</span>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-gray-600">
              <Play size={14} className="mr-1" />
              {song.plays}
            </div>
            <div className="flex items-center text-red-500">
              <Heart size={14} className="mr-1" />
              {song.likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}