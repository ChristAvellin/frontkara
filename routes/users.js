import express from 'express';
import User from '../models/User.js';
import Song from '../models/Song.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user profile with playlists and favorites
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('favorites')
      .populate('playlists.songs');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      country: user.country,
      isAdmin: user.isAdmin,
      playlists: user.playlists,
      favorites: user.favorites.map(song => song._id),
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add song to favorites
router.post('/favorites/:songId', authenticateToken, async (req, res) => {
  try {
    const { songId } = req.params;
    
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    const user = await User.findById(req.userId);
    if (!user.favorites.includes(songId)) {
      user.favorites.push(songId);
      await user.save();
    }

    res.json({ message: 'Song added to favorites' });
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove song from favorites
router.delete('/favorites/:songId', authenticateToken, async (req, res) => {
  try {
    const { songId } = req.params;
    
    const user = await User.findById(req.userId);
    user.favorites = user.favorites.filter(id => id.toString() !== songId);
    await user.save();

    res.json({ message: 'Song removed from favorites' });
  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new playlist
router.post('/playlists', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Playlist name is required' });
    }

    const user = await User.findById(req.userId);
    const newPlaylist = {
      name: name.trim(),
      songs: [],
      createdAt: new Date(),
    };
    
    user.playlists.push(newPlaylist);
    await user.save();

    res.status(201).json({
      message: 'Playlist created successfully',
      playlist: newPlaylist,
    });
  } catch (error) {
    console.error('Create playlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add song to playlist
router.post('/playlists/:playlistId/songs', authenticateToken, async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { songId } = req.body;
    
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    const user = await User.findById(req.userId);
    const playlist = user.playlists.id(playlistId);
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await user.save();
    }

    res.json({ message: 'Song added to playlist' });
  } catch (error) {
    console.error('Add to playlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove song from playlist
router.delete('/playlists/:playlistId/songs/:songId', authenticateToken, async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    
    const user = await User.findById(req.userId);
    const playlist = user.playlists.id(playlistId);
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    playlist.songs = playlist.songs.filter(id => id.toString() !== songId);
    await user.save();

    res.json({ message: 'Song removed from playlist' });
  } catch (error) {
    console.error('Remove from playlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete playlist
router.delete('/playlists/:playlistId', authenticateToken, async (req, res) => {
  try {
    const { playlistId } = req.params;
    
    const user = await User.findById(req.userId);
    user.playlists = user.playlists.filter(playlist => playlist._id.toString() !== playlistId);
    await user.save();

    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    console.error('Delete playlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's playlists
router.get('/playlists', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('playlists.songs');
    res.json(user.playlists);
  } catch (error) {
    console.error('Get playlists error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's favorites
router.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;