import { useState } from 'react';
import { Home, Music, Mic2, Users, Settings, Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Image as ImageIcon, Grid3X3, List, MoreVertical, Play, Heart, Download, Eye, TrendingUp, Award, Clock, Star, User } from 'lucide-react';
import StatsCard from './StatsCard';

export default function DashboardContent({ songs, artists }) {
  const stats = [
    { title: "Total Chansons", value: songs.length, icon: Music, color: "#3a5157", growth: "+12%" },
    { title: "Total Artistes", value: artists.length, icon: Mic2, color: "#Face6b", growth: "+8%" },
    { title: "Utilisateurs Actifs", value: "1,245", icon: Users, color: "#3a5157", growth: "+23%" },
    { title: "Écoutes Total", value: "52.3K", icon: TrendingUp, color: "#Face6b", growth: "+15%" }
  ];

  return (
    <div className="dashboard-content">
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="dashboard-subtitle">Vue d'ensemble de votre plateforme</p>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3 className="chart-title">Tendances d'écoute</h3>
          <div className="chart-placeholder">
            <p className="chart-text">Graphique des tendances (Placeholder)</p>
          </div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Top Artistes</h3>
          <div className="top-artists">
            {artists.slice(0, 3).map((artist, index) => (
              <div key={artist.id} className="artist-item">
                <div className="artist-image">
                  <img src={artist.image} alt={artist.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="artist-info">
                  <p className="artist-name">{artist.name}</p>
                  <p className="artist-songs">{artist.songsCount} chansons</p>
                </div>
                <p className="artist-rank">#{index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3 className="activity-title">Activité Récente</h3>
        <div className="activity-list">
          {songs.slice(0, 5).map((song) => (
            <div key={song.id} className="activity-item">
              <div className="activity-image">
                <img src={song.image} alt={song.title} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="activity-details">
                <p className="activity-title-text">{song.title}</p>
                <p className="activity-artist">{song.artist}</p>
              </div>
              <div className="activity-stats">
                <div className="stat-item">
                  <Play size={14} className="mr-1" />
                  {song.plays}
                </div>
                <div className="stat-item">
                  <Heart size={14} className="mr-1" />
                  {song.likes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}