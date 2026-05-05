const mongoose = require('mongoose');

const callbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: 20,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'contacted'],
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true }
);

callbackSchema.index({ name: 'text', phone: 'text', message: 'text' });

module.exports = mongoose.model('Callback', callbackSchema);
