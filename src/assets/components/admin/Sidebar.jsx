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
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {!collapsed && (
            <div className="logo-content">
              <div className="logo-icon">
                <Music className="text-[#3a5157]" size={20} />
              </div>
              <div className="logo-text">
                <h1 className="text-xl font-bold text-[#Face6b]">KaraArema</h1>
                <p className="text-xs text-gray-300">Admin Panel</p>
              </div>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="collapse-button"
          >
            <ChevronDown className={`transition-transform ${collapsed ? 'rotate-90' : '-rotate-90'}`} size={16} />
          </button>
        </div>
      </div>

      <nav className="sidebar-nav">
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
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            >
              <Icon size={20} className="nav-icon" />
              {!collapsed && <span className="nav-label">{item.label}</span>}
              {!collapsed && activeTab === item.id && (
                <div className="nav-indicator"></div>
              )}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-icon">
              <User className="text-[#3a5157]" size={20} />
            </div>
            <div className="user-info">
              <p className="user-name">Admin User</p>
              <p className="user-email">admin@karaarema.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}