import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Artist from '../models/Artist.js';
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
    cb(null, 'artist-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for images
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get all artists
router.get('/', async (req, res) => {
  try {
    const { search, limit = 50 } = req.query;
    
    let query = { isActive: true };
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    const artists = await Artist.find(query)
      .limit(parseInt(limit))
      .sort({ name: 1 });
    
    res.json(artists);
  } catch (error) {
    console.error('Get artists error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single artist
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.json(artist);
  } catch (error) {
    console.error('Get artist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new artist (Admin only)
router.post('/', authenticateToken, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, bio, genre } = req.body;
    
    // Check if artist already exists
    const existingArtist = await Artist.findOne({ name });
    if (existingArtist) {
      return res.status(400).json({ message: 'Artist with this name already exists' });
    }
    
    const artistData = {
      name,
      bio,
      genre: genre ? JSON.parse(genre) : [],
    };
    
    if (req.file) {
      artistData.imageFile = req.file.filename;
    }
    
    const artist = new Artist(artistData);
    await artist.save();
    
    res.status(201).json({
      message: 'Artist created successfully',
      artist,
    });
  } catch (error) {
    console.error('Create artist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update artist (Admin only)
router.put('/:id', authenticateToken, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, bio, genre } = req.body;
    
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    
    // Check if name is being changed and if it conflicts with existing artist
    if (name && name !== artist.name) {
      const existingArtist = await Artist.findOne({ name });
      if (existingArtist) {
        return res.status(400).json({ message: 'Artist with this name already exists' });
      }
    }
    
    // Update fields
    artist.name = name || artist.name;
    artist.bio = bio || artist.bio;
    artist.genre = genre ? JSON.parse(genre) : artist.genre;
    
    if (req.file) {
      artist.imageFile = req.file.filename;
    }
    
    await artist.save();
    
    res.json({
      message: 'Artist updated successfully',
      artist,
    });
  } catch (error) {
    console.error('Update artist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete artist (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    
    await Artist.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Artist deleted successfully' });
  } catch (error) {
    console.error('Delete artist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;