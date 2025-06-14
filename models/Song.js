import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ['Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Jazz', 'Electronic', 'Classical', 'Other'],
  },
  duration: {
    type: String,
    required: true,
  },
  audioFile: {
    type: String,
    required: false,
  },
  imageFile: {
    type: String,
    required: false,
  },
  lyrics: {
    type: String,
    default: '',
  },
  playCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Index for search functionality
songSchema.index({ title: 'text', artist: 'text' });

export default mongoose.model('Song', songSchema);