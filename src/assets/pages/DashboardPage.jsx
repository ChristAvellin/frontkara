import React, { useState, useEffect } from 'react';
import { Music, Search, Play, Heart, Plus, LogOut, User } from 'lucide-react';

// Mock data for demonstration
const mockUser = {
  firstName: 'John',
  isAdmin: true
};

const mockSongs = [
  {
    _id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    genre: 'Rock',
    duration: '5:55',
    imageFile: null
  },
  {
    _id: '2',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    genre: 'Pop',
    duration: '4:54',
    imageFile: null
  },
  {
    _id: '3',
    title: 'Hotel California',
    artist: 'Eagles',
    genre: 'Rock',
    duration: '6:30',
    imageFile: null
  },
  {
    _id: '4',
    title: 'Thriller',
    artist: 'Michael Jackson',
    genre: 'Pop',
    duration: '5:57',
    imageFile: null
  }
];

const DashboardPage = () => {
  const user = mockUser;
  const logout = () => console.log('Logout clicked');
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api';

  const genres = ['All', 'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Jazz', 'Electronic', 'Classical', 'Other'];

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    filterSongs();
  }, [songs, searchTerm, selectedGenre]);

  const fetchSongs = () => {
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        setSongs(mockSongs);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching songs:', error);
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

  const handleLogout = () => {
    logout();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Music className="w-8 h-8 text-purple-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Music className="w-10 h-10 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                KaraArema
              </h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <User className="w-5 h-5 text-purple-300" />
                <span className="text-white font-medium">Welcome, {user?.firstName}!</span>
                {user?.isAdmin && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Admin
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-lg px-3 py-2 group"
              >
                <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5 group-focus-within:text-purple-300 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search songs or artists..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/20"
              />
            </div>
            
            <select
              value={selectedGenre}
              onChange={handleGenreChange}
              className="md:w-48 px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/20 cursor-pointer"
            >
              {genres.map(genre => (
                <option key={genre} value={genre} className="bg-slate-800 text-white">
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSongs.map((song) => (
            <div 
              key={song._id} 
              className="group cursor-pointer bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img
                  src={song.imageFile ? `${API_URL}/uploads/${song.imageFile}` : 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'}
                  alt={`${song.title} cover`}
                  className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-purple-500 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                    <Play className="w-8 h-8 text-white" fill="white" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-white font-bold text-lg truncate group-hover:text-purple-300 transition-colors duration-300">
                  {song.title}
                </h3>
                <p className="text-white/70 truncate font-medium">{song.artist}</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-400 text-sm font-semibold bg-purple-500/20 px-2 py-1 rounded-full">
                    {song.genre}
                  </span>
                  <span className="text-white/50 text-sm font-mono">{song.duration}</span>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button 
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
                  aria-label={`Play ${song.title}`}
                >
                  <Play className="w-4 h-4" fill="white" />
                  <span>Play</span>
                </button>
                <button 
                  className="bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-white p-3 rounded-xl transition-all duration-300 border border-white/20 hover:border-red-500/50 transform hover:scale-110"
                  aria-label={`Add ${song.title} to favorites`}
                >
                  <Heart className="w-4 h-4" />
                </button>
                <button 
                  className="bg-white/10 hover:bg-green-500/20 hover:text-green-400 text-white p-3 rounded-xl transition-all duration-300 border border-white/20 hover:border-green-500/50 transform hover:scale-110"
                  aria-label={`Add ${song.title} to playlist`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSongs.length === 0 && (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <Music className="w-24 h-24 text-white/20 mx-auto" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <h3 className="text-2xl text-white/70 mb-4 font-bold">No songs found</h3>
            <p className="text-white/50 text-lg max-w-md mx-auto">
              Try adjusting your search terms or explore different genres to discover amazing music
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('All');
              }}
              className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;