const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200,
    },
    category: {
      type: String,
      required: true,
      enum: ['weddings', 'commercials', 'events', 'music'],
      index: true,
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
      trim: true,
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
