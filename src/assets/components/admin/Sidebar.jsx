// Sidebar Component
import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, setViewMode, collapsed, setCollapsed }) {
   const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'songs', label: 'Songs', icon: Music },
    { id: 'artists', label: 'Artists', icon: Mic2 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[#3a5157] to-[#2a3d42] text-white transition-all duration-300 z-30 ${collapsed ? 'w-16' : 'w-72'}`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#Face6b] to-[#f5c85a] rounded-xl flex items-center justify-center">
                <Music className="text-[#3a5157]" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#Face6b]">KaraArema</h1>
                <p className="text-xs text-gray-300">Admin Panel</p>
              </div>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronDown className={`transition-transform ${collapsed ? 'rotate-90' : '-rotate-90'}`} size={16} />
          </button>
        </div>
      </div>

      <nav className="px-4 space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === 'songs' || item.id === 'artists') {
                  setViewMode('grid');
                }
              }}
              className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-[#Face6b] to-[#f5c85a] text-[#3a5157] shadow-lg' 
                  : 'hover:bg-white/10 hover:translate-x-1'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
              {!collapsed && activeTab === item.id && (
                <div className="ml-auto w-2 h-2 bg-[#3a5157] rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-r from-[#Face6b]/20 to-[#f5c85a]/20 rounded-xl p-4 border border-[#Face6b]/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#Face6b] rounded-full flex items-center justify-center">
                <User className="text-[#3a5157]" size={20} />
              </div>
              <div>
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs text-gray-300">admin@karaarema.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}