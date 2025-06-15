import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';
import SongCard from './SongCard';

export default function SongsGrid({ songs, onEdit, onDelete }) {
   return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {songs.map(song => (
        <SongCard key={song.id} song={song} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}