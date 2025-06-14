import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Song from '../models/Song.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'audio') {
      if (file.mimetype.startsWith('audio/')) {
        cb(null, true);
      } else {
        cb(new Error('Only audio files are allowed for audio field'));
      }
    } else if (file.fieldname === 'image') {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for image field'));
      }
    } else {
      cb(new Error('Unexpected field'));
    }
  }
});

// Get all songs
router.get('/', async (req, res) => {
  try {
    const { genre, search, limit = 50 } = req.query;
    
    let query = { isActive: true };
    
    if (genre && genre !== 'All') {
      query.genre = genre;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } }
      ];
    }
    
    const songs = await Song.find(query)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    res.json(songs);
  } catch (error) {
    console.error('Get songs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single song
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    console.error('Get song error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new song (Admin only)
router.post('/', authenticateToken, requireAdmin, upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, artist, genre, duration, lyrics } = req.body;
    
    const songData = {
      title,
      artist,
      genre,
      duration,
      lyrics: lyrics || '',
    };
    
    if (req.files?.audio?.[0]) {
      songData.audioFile = req.files.audio[0].filename;
    }
    
    if (req.files?.image?.[0]) {
      songData.imageFile = req.files.image[0].filename;
    }
    
    const song = new Song(songData);
    await song.save();
    
    res.status(201).json({
      message: 'Song created successfully',
      song,
    });
  } catch (error) {
    console.error('Create song error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update song (Admin only)
router.put('/:id', authenticateToken, requireAdmin, upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, artist, genre, duration, lyrics } = req.body;
    
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    
    // Update fields
    song.title = title || song.title;
    song.artist = artist || song.artist;
    song.genre = genre || song.genre;
    song.duration = duration || song.duration;
    song.lyrics = lyrics !== undefined ? lyrics : song.lyrics;
    
    if (req.files?.audio?.[0]) {
      song.audioFile = req.files.audio[0].filename;
    }
    
    if (req.files?.image?.[0]) {
      song.imageFile = req.files.image[0].filename;
    }
    
    await song.save();
    
    res.json({
      message: 'Song updated successfully',
      song,
    });
  } catch (error) {
    console.error('Update song error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete song (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    
    await Song.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error('Delete song error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Increment play count
router.post('/:id/play', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { $inc: { playCount: 1 } },
      { new: true }
    );
    
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    
    res.json({ message: 'Play count updated', playCount: song.playCount });
  } catch (error) {
    console.error('Update play count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;