import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  bio: {
    type: String,
    required: true,
  },
  imageFile: {
    type: String,
    required: false,
  },
  genre: {
    type: [String],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Artist', artistSchema);