import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Music, Search, Filter, Play, Heart, Plus, LogOut, User, Settings } from 'lucide-react';
import axios from 'axios';

const HomePage = () => {
  const { user, logout } = useAuth();
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const API_URL = 'http://localhost:5000/api';

  const genres = ['All', 'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Jazz', 'Electronic', 'Classical', 'Other'];

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    filterSongs();
  }, [songs, searchTerm, selectedGenre]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${API_URL}/songs`);
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSongs = () => {
    let filtered = songs;

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(song => song.genre === selectedGenre);
    }

    if (searchTerm) {
      filtered = filtered.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSongs(filtered);
  };

  const handlePlay = async (songId) => {
    try {
      await axios.post(`${API_URL}/songs/${songId}/play`);
      setCurrentlyPlaying(songId);
      // Update play count in local state
      setSongs(songs.map(song => 
        song._id === songId 
          ? { ...song, playCount: song.playCount + 1 }
          : song
      ));
    } catch (error) {
      console.error('Error updating play count:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Music className="w-8 h-8 text-primary-400" />
              <h1 className="text-2xl font-bold text-white">KaraArema</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/home" className="text-primary-300 font-medium">
                Home
              </Link>
              <Link to="/users" className="text-white/70 hover:text-white transition-colors">
                Browse Songs
              </Link>
              {user?.isAdmin && (
                <Link to="/admin" className="text-white/70 hover:text-white transition-colors">
                  Admin Panel
                </Link>
              )}
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Welcome, {user?.firstName}!</span>
                {user?.isAdmin && (
                  <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs">
                    Admin
                  </span>
                )}
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Your Music World
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover thousands of songs, create your perfect playlists, and sing your heart out!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-400">{songs.length}</div>
            <div className="text-white/70 text-sm">Total Songs</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-secondary-400">{genres.length - 1}</div>
            <div className="text-white/70 text-sm">Genres</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary-400">∞</div>
            <div className="text-white/70 text-sm">Playlists</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-secondary-400">24/7</div>
            <div className="text-white/70 text-sm">Available</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search songs, artists, or albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 w-full"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="input-field pl-12 md:w-48 appearance-none"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-gray-800">
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Genre Categories */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {genres.slice(1).map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedGenre === genre
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Songs Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              {selectedGenre === 'All' ? 'All Songs' : `${selectedGenre} Songs`}
            </h3>
            <div className="text-white/70">
              {filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''} found
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSongs.map((song) => (
              <div key={song._id} className="card group cursor-pointer hover:scale-105 transition-all duration-300">
                <div className="relative mb-4">
                  <img
                    src={song.imageFile ? `${API_URL}/uploads/${song.imageFile}` : 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'}
                    alt={song.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button
                      onClick={() => handlePlay(song._id)}
                      className="bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full transform hover:scale-110 transition-all duration-300"
                    >
                      <Play className="w-8 h-8" />
                    </button>
                  </div>
                  {currentlyPlaying === song._id && (
                    <div className="absolute top-2 right-2 bg-primary-500 text-white px-2 py-1 rounded-full text-xs">
                      Playing
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-semibold text-lg truncate">{song.title}</h4>
                  <p className="text-white/70 truncate">{song.artist}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-primary-300">{song.genre}</span>
                    <span className="text-white/50">{song.duration}</span>
                  </div>
                  <div className="text-white/50 text-xs">
                    {song.playCount} play{song.playCount !== 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handlePlay(song._id)}
                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Play</span>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredSongs.length === 0 && (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl text-white/70 mb-2">No songs found</h3>
            <p className="text-white/50">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Link to="/users" className="card group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-500 p-3 rounded-full">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Browse All Songs</h4>
                <p className="text-white/70 text-sm">Explore our complete music library</p>
              </div>
            </div>
          </Link>
          
          {user?.isAdmin && (
            <Link to="/admin" className="card group hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary-500 p-3 rounded-full">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Admin Panel</h4>
                  <p className="text-white/70 text-sm">Manage songs and artists</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;