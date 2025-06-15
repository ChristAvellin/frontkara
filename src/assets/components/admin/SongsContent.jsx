// Songs Content Component
import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';
import SongsGrid from './SongsGrid';
import SongsTable from './SongsTable';

export default function SongsContent({ songs, viewMode, onEdit, onDelete }) {
   if (viewMode === 'grid') {
    return <SongsGrid songs={songs} onEdit={onEdit} onDelete={onDelete} />;
  }
  return <SongsTable songs={songs} onEdit={onEdit} onDelete={onDelete} />;
}