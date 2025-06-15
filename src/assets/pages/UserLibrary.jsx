import { useState, useEffect } from 'react';
import { Search, Music, Mic2, Heart, Play, List, Grid, Plus, FolderPlus, Check, X } from 'lucide-react';

export default function UserLibrary() {
  // State for songs data
  const [songs, setSongs] = useState([
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      duration: "5:55",
      plays: 12453,
      likes: 8921,
      image: "https://picsum.photos/300/300?random=1",
      color: "#Face6b",
      audio: "/songs/bohemian.mp3",
      isLiked: false
    },
    {
      id: 2,
      title: "Sweet Child O'Mine",
      artist: "Guns N' Roses",
      duration: "5:56",
      plays: 9872,
      likes: 7654,
      image: "https://picsum.photos/300/300?random=2",
      color: "#30454a",
      audio: "/songs/sweet-child.mp3",
      isLiked: true
    },
    {
      id: 3,
      title: "La Vie En Rose",
      artist: "Édith Piaf",
      duration: "3:07",
      plays: 7563,
      likes: 5432,
      image: "https://picsum.photos/300/300?random=3",
      color: "#Face6b",
      audio: "/songs/vie-en-rose.mp3",
      isLiked: false
    }
  ]);

  // State for UI controls
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);

  // Load playlists from localStorage on component mount
  useEffect(() => {
    const savedPlaylists = localStorage.getItem('karaarema-playlists');
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    }
  }, []);

  // Save playlists to localStorage when they change
  useEffect(() => {
    localStorage.setItem('karaarema-playlists', JSON.stringify(playlists));
  }, [playlists]);

  // Filter songs based on search and active filter
  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'popular' && song.plays > 10000) ||
                         (activeFilter === 'favorites' && song.isLiked);
    return matchesSearch && matchesFilter;
  });

  // Toggle like status for a song
  const toggleLike = (id) => {
    setSongs(songs.map(song => 
      song.id === id ? { 
        ...song, 
        isLiked: !song.isLiked, 
        likes: song.isLiked ? song.likes - 1 : song.likes + 1 
      } : song
    ));
  };

  // Toggle song selection for playlist
  const toggleSongSelection = (id) => {
    setSelectedSongs(prev => 
      prev.includes(id) 
        ? prev.filter(songId => songId !== id) 
        : [...prev, id]
    );
  };

  // Create new playlist
  const createPlaylist = () => {
    if (newPlaylistName.trim() && selectedSongs.length > 0) {
      const newPlaylist = {
        id: Date.now(),
        name: newPlaylistName,
        songs: selectedSongs,
        createdAt: new Date().toISOString()
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setSelectedSongs([]);
      setSelectionMode(false);
      setShowPlaylistModal(false);
    }
  };

  // Check if song is in selection
  const isSelected = (id) => selectedSongs.includes(id);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#30454a] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#Face6b]">KaraArema</h1>
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search songs or artists..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#3a5157] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#Face6b]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <nav className="flex items-center space-x-6">
            <button className="flex items-center text-white hover:text-[#Face6b]">
              <Music className="mr-2" size={18} />
              Songs
            </button>
            <button className="flex items-center text-white hover:text-[#Face6b]">
              <Mic2 className="mr-2" size={18} />
              Artists
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button 
              onClick={() => setSelectionMode(!selectionMode)}
              className={`flex items-center px-4 py-2 rounded-lg ${selectionMode ? 'bg-[#30454a] text-white' : 'bg-white text-[#30454a] border border-[#30454a]'}`}
            >
              {selectionMode ? (
                <>
                  <X className="mr-2" size={16} />
                  Cancel Selection
                </>
              ) : (
                <>
                  <FolderPlus className="mr-2" size={16} />
                  Add to Playlist
                </>
              )}
            </button>
            {selectionMode && selectedSongs.length > 0 && (
              <button 
                onClick={() => setShowPlaylistModal(true)}
                className="flex items-center px-4 py-2 bg-[#Face6b] text-[#30454a] rounded-lg font-medium"
              >
                <Plus className="mr-2" size={16} />
                Create Playlist ({selectedSongs.length})
              </button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex border rounded-lg overflow-hidden">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 flex items-center ${viewMode === 'list' ? 'bg-[#30454a] text-white' : 'bg-white text-[#30454a]'}`}
              >
                <List className="mr-1" size={16} />
                List
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 flex items-center ${viewMode === 'grid' ? 'bg-[#30454a] text-white' : 'bg-white text-[#30454a]'}`}
              >
                <Grid className="mr-1" size={16} />
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-6">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full ${activeFilter === 'all' ? 'bg-[#30454a] text-white' : 'bg-white text-[#30454a]'}`}
          >
            All Songs
          </button>
          <button 
            onClick={() => setActiveFilter('popular')}
            className={`px-4 py-2 rounded-full ${activeFilter === 'popular' ? 'bg-[#30454a] text-white' : 'bg-white text-[#30454a]'}`}
          >
            Most Popular
          </button>
          <button 
            onClick={() => setActiveFilter('favorites')}
            className={`px-4 py-2 rounded-full ${activeFilter === 'favorites' ? 'bg-[#30454a] text-white' : 'bg-white text-[#30454a]'}`}
          >
            My Favorites
          </button>
        </div>

        {/* Playlists Section */}
        {playlists.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#30454a] mb-4">Your Playlists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {playlists.map(playlist => (
                <div 
                  key={playlist.id} 
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="bg-[#30454a] bg-opacity-10 w-full aspect-square rounded mb-2 flex items-center justify-center">
                    <Music className="text-[#30454a]" size={32} />
                    <span className="absolute text-xs font-bold text-white bg-[#30454a] rounded-full px-2 py-1">
                      {playlist.songs.length}
                    </span>
                  </div>
                  <h3 className="font-medium text-[#30454a] truncate">{playlist.name}</h3>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(playlist.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Songs Display */}
        <h2 className="text-xl font-bold text-[#30454a] mb-4">
          {activeFilter === 'all' ? 'All Songs' : activeFilter === 'popular' ? 'Popular Songs' : 'Favorite Songs'}
        </h2>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredSongs.map(song => (
              <div 
                key={song.id} 
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group relative ${selectionMode ? 'cursor-pointer' : ''}`}
                style={{ backgroundColor: song.color }}
                onClick={() => selectionMode && toggleSongSelection(song.id)}
              >
                {selectionMode && (
                  <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected(song.id) ? 'bg-[#Face6b] border-[#Face6b]' : 'bg-white border-[#30454a]'}`}>
                    {isSelected(song.id) && <Check size={12} className="text-[#30454a]" />}
                  </div>
                )}
                <div className="relative pt-[100%]">
                  <img 
                    src={song.image} 
                    alt={`Album cover for ${song.title} by ${song.artist}`}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  {!selectionMode && (
                    <button className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={20} fill="white" />
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white truncate">{song.title}</h3>
                  <p className="text-sm text-white opacity-80 truncate">{song.artist}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-white opacity-70">{song.duration}</span>
                    {!selectionMode && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(song.id);
                        }}
                        className="text-white hover:text-red-500"
                      >
                        <Heart 
                          size={16} 
                          fill={song.isLiked ? "currentColor" : "none"} 
                          color={song.isLiked ? "currentColor" : "white"} 
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#30454a]">
                <tr>
                  {selectionMode && <th className="px-6 py-3 text-left text-xs font-medium text-[#Face6b] uppercase tracking-wider"></th>}
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#Face6b] uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#Face6b] uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#Face6b] uppercase tracking-wider">
                    Artist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#Face6b] uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#Face6b] uppercase tracking-wider">
                    Plays
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#Face6b] uppercase tracking-wider">
                    Likes
                  </th>
                  {!selectionMode && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#Face6b] uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSongs.map((song, index) => (
                  <tr 
                    key={song.id} 
                    className={`hover:bg-gray-50 ${selectionMode ? 'cursor-pointer' : ''}`}
                    onClick={() => selectionMode && toggleSongSelection(song.id)}
                  >
                    {selectionMode && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected(song.id) ? 'bg-[#Face6b] border-[#Face6b]' : 'bg-white border-[#30454a]'}`}>
                          {isSelected(song.id) && <Check size={12} className="text-[#30454a]" />}
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            src={song.image} 
                            alt={`Album cover for ${song.title}`}
                            className="h-10 w-10 rounded"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{song.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {song.artist}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {song.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {song.plays.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {song.likes.toLocaleString()}
                    </td>
                    {!selectionMode && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-4">
                          <button className="text-[#30454a] hover:text-[#3a5157]">
                            <Play size={16} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(song.id);
                            }}
                            className={`${song.isLiked ? 'text-red-500' : 'text-[#30454a]'} hover:text-red-600`}
                          >
                            <Heart size={16} fill={song.isLiked ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Playlist Creation Modal */}
      {showPlaylistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#30454a]">Create New Playlist</h3>
              <button 
                onClick={() => {
                  setShowPlaylistModal(false);
                  setNewPlaylistName('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Playlist Name</label>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#30454a] focus:border-transparent"
                placeholder="My Awesome Playlist"
              />
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                {selectedSongs.length} {selectedSongs.length === 1 ? 'song' : 'songs'} selected
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowPlaylistModal(false);
                  setNewPlaylistName('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={createPlaylist}
                disabled={!newPlaylistName.trim() || selectedSongs.length === 0}
                className={`px-4 py-2 rounded-md ${!newPlaylistName.trim() || selectedSongs.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#30454a] text-white hover:bg-[#3a5157]'}`}
              >
                Create Playlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}