import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';
import ArtistsGrid from "./ArtistsGrid";
import ArtistsTable from "./ArtistsTable";

// Artists Content Component
export default function ArtistsContent({ artists, viewMode, onEdit, onDelete }) {
  if (viewMode === 'grid') {
    return <ArtistsGrid artists={artists} onEdit={onEdit} onDelete={onDelete} />;
  }
  return <ArtistsTable artists={artists} onEdit={onEdit} onDelete={onDelete} />;
}