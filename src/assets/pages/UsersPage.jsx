import React, { useState, useEffect } from 'react';
import { 
  Music, Search, Filter, Play, Heart, Plus, LogOut, User, 
  Home, List, Star, Download, Share2, MoreVertical 
} from 'lucide-react';

const UsersPage = () => {
  // Mock auth context for demonstration
  const user = { firstName: 'John', isAdmin: false };
  const logout = () => console.log('Logout clicked');

  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [showSongDetails, setShowSongDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const API_URL = 'http://localhost:5000/api';

  const genres = ['All', 'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Jazz', 'Electronic', 'Classical', 'Other'];

  // Mock data for demonstration
  const mockSongs = [
    {
      _id: '1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      genre: 'Rock',
      duration: '5:55',
      playCount: 1250,
      lyrics: 'Is this the real life?\nIs this just fantasy?\nCaught in a landslide...',
      imageFile: null
    },
    {
      _id: '2',
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      genre: 'Pop',
      duration: '4:54',
      playCount: 980,
      lyrics: 'Billie Jean is not my lover\nShe\'s just a girl who claims that I am the one...',
      imageFile: null
    },
    {
      _id: '3',
      title: 'Hotel California',
      artist: 'Eagles',
      genre: 'Rock',
      duration: '6:30',
      playCount: 1450,
      imageFile: null
    }
  ];

  const mockPlaylists = [
    {
      _id: 'p1',
      name: 'Rock Classics',
      songs: [],
      createdAt: '2024-01-15T00:00:00Z'
    },
    {
      _id: 'p2',
      name: 'My Favorites',
      songs: [],
      createdAt: '2024-02-01T00:00:00Z'
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterSongs();
  }, [songs, searchTerm, selectedGenre]);

  const fetchData = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setSongs(mockSongs);
        setFavorites(['1', '3']);
        setPlaylists(mockPlaylists);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      setCurrentlyPlaying(songId);
      setSongs(songs.map(song => 
        song._id === songId 
          ? { ...song, playCount: song.playCount + 1 }
          : song
      ));
    } catch (error) {
      console.error('Error updating play count:', error);
    }
  };

  const toggleFavorite = async (songId) => {
    try {
      const isFavorite = favorites.includes(songId);
      if (isFavorite) {
        setFavorites(favorites.filter(id => id !== songId));
      } else {
        setFavorites([...favorites, songId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const createPlaylist = async () => {
    if (!newPlaylistName.trim()) return;
    
    try {
      const newPlaylist = {
        _id: Date.now().toString(),
        name: newPlaylistName,
        songs: [],
        createdAt: new Date().toISOString()
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const addToPlaylist = async (playlistId, songId) => {
    try {
      console.log(`Adding song ${songId} to playlist ${playlistId}`);
      // Refresh playlists
      fetchData();
    } catch (error) {
      console.error('Error adding to playlist:', error);
    }
  };

  const showSongDetailsModal = (song) => {
    setSelectedSong(song);
    setShowSongDetails(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Music className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">KaraArema</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/home" className="text-white/70 hover:text-white transition-colors">
                Home
              </a>
              <a href="/users" className="text-purple-300 font-medium">
                Browse Songs
              </a>
              {user?.isAdmin && (
                <a href="/admin" className="text-white/70 hover:text-white transition-colors">
                  Admin Panel
                </a>
              )}
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">{user?.firstName}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Music Library</h2>
          <p className="text-white/70">Discover, play, and organize your favorite songs</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
            <div className="text-2xl font-bold text-purple-400">{songs.length}</div>
            <div className="text-white/70 text-sm">Total Songs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
            <div className="text-2xl font-bold text-red-400">{favorites.length}</div>
            <div className="text-white/70 text-sm">Favorites</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
            <div className="text-2xl font-bold text-blue-400">{playlists.length}</div>
            <div className="text-white/70 text-sm">Playlists</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
            <div className="text-2xl font-bold text-green-400">{genres.length - 1}</div>
            <div className="text-white/70 text-sm">Genres</div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search songs, artists, albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm w-48 appearance-none"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre} className="bg-gray-800">
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-white/70'}`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-white/70'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={() => setShowCreatePlaylist(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Playlist</span>
              </button>
            </div>
          </div>
        </div>

        {/* Songs Display */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              {selectedGenre === 'All' ? 'All Songs' : `${selectedGenre} Songs`}
            </h3>
            <div className="text-white/70">
              {filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''}
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSongs.map((song) => (
                <div key={song._id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 group hover:scale-105 transition-all duration-300">
                  <div className="relative mb-4">
                    <img
                      src={song.imageFile ? `${API_URL}/uploads/${song.imageFile}` : 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'}
                      alt={song.title}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer"
                      onClick={() => showSongDetailsModal(song)}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => handlePlay(song._id)}
                        className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full transform hover:scale-110 transition-all duration-300"
                      >
                        <Play className="w-8 h-8" />
                      </button>
                    </div>
                    {currentlyPlaying === song._id && (
                      <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs animate-pulse">
                        Playing
                      </div>
                    )}
                    <button
                      onClick={() => toggleFavorite(song._id)}
                      className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(song._id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold text-lg truncate">{song.title}</h4>
                    <p className="text-white/70 truncate">{song.artist}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-purple-300">{song.genre}</span>
                      <span className="text-white/50">{song.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-white/50">
                      <span>{song.playCount} plays</span>
                      <Star className="w-3 h-3" />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handlePlay(song._id)}
                      className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Play</span>
                    </button>
                    <div className="relative group">
                      <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-10">
                        <div className="space-y-1 min-w-32">
                          {playlists.map(playlist => (
                            <button
                              key={playlist._id}
                              onClick={() => addToPlaylist(playlist._id, song._id)}
                              className="block w-full text-left text-white/80 hover:text-white text-sm py-1 px-2 rounded hover:bg-white/10"
                            >
                              {playlist.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredSongs.map((song, index) => (
                <div key={song._id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex items-center space-x-4 hover:bg-white/15 transition-colors">
                  <div className="text-white/50 w-8 text-center">{index + 1}</div>
                  <img
                    src={song.imageFile ? `${API_URL}/uploads/${song.imageFile}` : 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'}
                    alt={song.title}
                    className="w-12 h-12 object-cover rounded cursor-pointer"
                    onClick={() => showSongDetailsModal(song)}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{song.title}</h4>
                    <p className="text-white/70 text-sm truncate">{song.artist}</p>
                  </div>
                  <div className="text-purple-300 text-sm">{song.genre}</div>
                  <div className="text-white/50 text-sm">{song.duration}</div>
                  <div className="text-white/50 text-sm">{song.playCount} plays</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePlay(song._id)}
                      className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(song._id)}
                      className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(song._id) ? 'text-red-500 fill-current' : ''}`} />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredSongs.length === 0 && (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl text-white/70 mb-2">No songs found</h3>
            <p className="text-white/50">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Playlists Section */}
        {playlists.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Your Playlists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <div key={playlist._id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <List className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{playlist.name}</h4>
                      <p className="text-white/70 text-sm">{playlist.songs.length} songs</p>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm">
                    Created {new Date(playlist.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Playlist Modal */}
      {showCreatePlaylist && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-6">Create New Playlist</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                autoFocus
              />
              <div className="flex space-x-4">
                <button
                  onClick={createPlaylist}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-200 ${
                    newPlaylistName.trim() 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!newPlaylistName.trim()}
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowCreatePlaylist(false);
                    setNewPlaylistName('');
                  }}
                  className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Song Details Modal */}
      {showSongDetails && selectedSong && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white">Song Details</h3>
              <button
                onClick={() => setShowSongDetails(false)}
                className="text-white/50 hover:text-white text-2xl leading-none"
              >
                ✕
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedSong.imageFile ? `${API_URL}/uploads/${selectedSong.imageFile}` : 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={selectedSong.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-white">{selectedSong.title}</h4>
                  <p className="text-xl text-white/70">{selectedSong.artist}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/50">Genre:</span>
                    <span className="text-purple-300 ml-2">{selectedSong.genre}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Duration:</span>
                    <span className="text-white ml-2">{selectedSong.duration}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Plays:</span>
                    <span className="text-white ml-2">{selectedSong.playCount}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Favorite:</span>
                    <span className="text-white ml-2">
                      {favorites.includes(selectedSong._id) ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
                
                {selectedSong.lyrics && (
                  <div>
                    <h5 className="text-white font-semibold mb-2">Lyrics:</h5>
                    <p className="text-white/80 text-sm whitespace-pre-line max-h-32 overflow-y-auto bg-white/5 p-3 rounded-lg">
                      {selectedSong.lyrics}
                    </p>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePlay(selectedSong._id)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Play</span>
                  </button>
                  <button
                    onClick={() => toggleFavorite(selectedSong._id)}
                    className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(selectedSong._id) ? 'text-red-500 fill-current' : ''}`} />
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;