// Artists Grid Component
import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';
import ArtistCard from './ArtistCard';

export default function ArtistsGrid({ artists, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {artists.map(artist => (
        <ArtistCard key={artist.id} artist={artist} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}