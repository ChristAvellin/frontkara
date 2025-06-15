// Add/Edit Modal Component
import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';

export default function AddEditModal({ type, item, onClose, onSubmit }) {
  const [formData, setFormData] = useState(
    item || (type === 'songs' 
      ? { title: '', artist: '', duration: '', language: '', image: '' } 
      : { name: '', image: '' })
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: item?.id });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#3a5157]">
            {item ? 'Modifier' : 'Ajouter'} {type === 'songs' ? 'Chanson' : 'Artiste'}
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ×
          </button>
        </div>
        <div>
          {type === 'songs' ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Artiste</label>
                <input
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                  placeholder="ex: 3:45"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">URL de l'image</label>
                <div className="relative">
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all pr-10"
                    placeholder="https://example.com/image.jpg"
                  />
                  <ImageIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#3a5157]" size={18} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">URL de l'image</label>
                <div className="relative">
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#Face6b] focus:border-transparent transition-all pr-10"
                    placeholder="https://example.com/image.jpg"
                  />
                  <ImageIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#3a5157]" size={18} />
                </div>
              </div>
            </>
          )}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-[#3a5157] to-[#2a3d42] text-white rounded-xl hover:shadow-lg transition-all"
            >
              {item ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}