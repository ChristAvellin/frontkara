import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Music,
  Plus,
  Edit,
  Trash2,
  Upload,
  Save,
  X,
  User,
  LogOut,
} from "lucide-react";
import axios from "axios";

const AdminPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("songs");
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [showSongModal, setShowSongModal] = useState(false);
  const [showArtistModal, setShowArtistModal] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [editingArtist, setEditingArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api";

  const [songForm, setSongForm] = useState({
    title: "",
    artist: "",
    genre: "Pop",
    duration: "",
  });

  const [artistForm, setArtistForm] = useState({
    name: "",
    bio: "",
  });

  const [songFiles, setSongFiles] = useState({
    audio: null,
    image: null,
  });

  const [artistFiles, setArtistFiles] = useState({
    image: null,
  });

  const genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "R&B",
    "Country",
    "Jazz",
    "Electronic",
    "Classical",
    "Other",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [songsResponse, artistsResponse] = await Promise.all([
        axios.get(`${API_URL}/songs`),
        axios.get(`${API_URL}/artists`),
      ]);
      setSongs(songsResponse.data);
      setArtists(artistsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSongSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", songForm.title);
    formData.append("artist", songForm.artist);
    formData.append("genre", songForm.genre);
    formData.append("duration", songForm.duration);

    if (songFiles.audio) {
      formData.append("audio", songFiles.audio);
    }
    if (songFiles.image) {
      formData.append("image", songFiles.image);
    }

    try {
      if (editingSong) {
        await axios.put(`${API_URL}/songs/${editingSong._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/songs`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchData();
      resetSongForm();
      setShowSongModal(false);
    } catch (error) {
      console.error("Error saving song:", error);
    }
  };

  const handleArtistSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", artistForm.name);
    formData.append("bio", artistForm.bio);

    if (artistFiles.image) {
      formData.append("image", artistFiles.image);
    }

    try {
      if (editingArtist) {
        await axios.put(`${API_URL}/artists/${editingArtist._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/artists`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchData();
      resetArtistForm();
      setShowArtistModal(false);
    } catch (error) {
      console.error("Error saving artist:", error);
    }
  };

  const deleteSong = async (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      try {
        await axios.delete(`${API_URL}/songs/${id}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting song:", error);
      }
    }
  };

  const deleteArtist = async (id) => {
    if (window.confirm("Are you sure you want to delete this artist?")) {
      try {
        await axios.delete(`${API_URL}/artists/${id}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting artist:", error);
      }
    }
  };

  const editSong = (song) => {
    setSongForm(song);
    setEditingSong(song);
    setShowSongModal(true);
  };

  const editArtist = (artist) => {
    setArtistForm(artist);
    setEditingArtist(artist);
    setShowArtistModal(true);
  };

  const resetSongForm = () => {
    setSongForm({
      title: "",
      artist: "",
      genre: "Pop",
      duration: "",
    });
    setSongFiles({ audio: null, image: null });
    setEditingSong(null);
  };

  const resetArtistForm = () => {
    setArtistForm({
      name: "",
      bio: "",
    });
    setArtistFiles({ image: null });
    setEditingArtist(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Music className="w-8 h-8 text-primary-400" />
              <h1 className="text-2xl font-bold text-white">KaraArema Admin</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <User className="w-5 h-5" />
                <span>Admin: {user?.firstName}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("songs")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "songs"
                ? "bg-primary-500 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            Songs Management
          </button>
          <button
            onClick={() => setActiveTab("artists")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "artists"
                ? "bg-primary-500 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            Artists Management
          </button>
        </div>

        {/* Songs Tab */}
        {activeTab === "songs" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Songs</h2>
              <button
                onClick={() => {
                  resetSongForm();
                  setShowSongModal(true);
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Song</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song) => (
                <div key={song._id} className="card">
                  <div className="mb-4">
                    <img
                      src={
                        song.imageFile
                          ? `${API_URL}/uploads/${song.imageFile}`
                          : "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300"
                      }
                      alt={song.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <h3 className="text-white font-semibold">{song.title}</h3>
                    <p className="text-white/70">{song.artist}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-300">{song.genre}</span>
                      <span className="text-white/50">{song.duration}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => editSong(song)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteSong(song._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Artists Tab */}
        {activeTab === "artists" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Artists</h2>
              <button
                onClick={() => {
                  resetArtistForm();
                  setShowArtistModal(true);
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Artist</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.map((artist) => (
                <div key={artist._id} className="card">
                  <div className="mb-4">
                    <img
                      src={
                        artist.imageFile
                          ? `${API_URL}/uploads/${artist.imageFile}`
                          : "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300"
                      }
                      alt={artist.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <h3 className="text-white font-semibold">{artist.name}</h3>
                    <p className="text-white/70 text-sm line-clamp-3">
                      {artist.bio}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => editArtist(artist)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteArtist(artist._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Song Modal */}
      {showSongModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                {editingSong ? "Edit Song" : "Add New Song"}
              </h3>
              <button
                onClick={() => setShowSongModal(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSongSubmit} className="space-y-6">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Song Title
                </label>
                <input
                  type="text"
                  value={songForm.title}
                  onChange={(e) =>
                    setSongForm({ ...songForm, title: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Artist
                </label>
                <input
                  type="text"
                  value={songForm.artist}
                  onChange={(e) =>
                    setSongForm({ ...songForm, artist: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Genre
                  </label>
                  <select
                    value={songForm.genre}
                    onChange={(e) =>
                      setSongForm({ ...songForm, genre: e.target.value })
                    }
                    className="input-field"
                  >
                    {genres.map((genre) => (
                      <option key={genre} value={genre} className="bg-gray-800">
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 3:45"
                    value={songForm.duration}
                    onChange={(e) =>
                      setSongForm({ ...songForm, duration: e.target.value })
                    }
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Audio File
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) =>
                    setSongFiles({
                      ...songFiles,
                      audio: e.target.files?.[0] || null,
                    })
                  }
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setSongFiles({
                      ...songFiles,
                      image: e.target.files?.[0] || null,
                    })
                  }
                  className="input-field"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{editingSong ? "Update Song" : "Add Song"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSongModal(false)}
                  className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Artist Modal */}
      {showArtistModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                {editingArtist ? "Edit Artist" : "Add New Artist"}
              </h3>
              <button
                onClick={() => setShowArtistModal(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleArtistSubmit} className="space-y-6">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Artist Name
                </label>
                <input
                  type="text"
                  value={artistForm.name}
                  onChange={(e) =>
                    setArtistForm({ ...artistForm, name: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Biography
                </label>
                <textarea
                  value={artistForm.bio}
                  onChange={(e) =>
                    setArtistForm({ ...artistForm, bio: e.target.value })
                  }
                  className="input-field h-32 resize-none"
                  placeholder="Tell us about this artist..."
                  required
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Artist Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setArtistFiles({ image: e.target.files?.[0] || null })
                  }
                  className="input-field"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{editingArtist ? "Update Artist" : "Add Artist"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowArtistModal(false)}
                  className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
