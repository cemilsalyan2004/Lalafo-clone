const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  number: {
    type: Number,
  },
  showNumber: {
    type: Boolean,
  },
  poster: {
    type: String,
    required: [true, 'Ad image required'],
    default: ['default.jpg'],
  },
  image: {
    type: [String],
    required: [true, 'Ad image required'],
    default: ['default.jpg'],
  },
  price: {
    type: Number,
    required: [true, 'Ad price required'],
  },
  desc: {
    type: String,
    required: [true, 'Ad price required'],
    trim: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: [true, 'post type required'],
  },
  city: {
    type: mongoose.Types.ObjectId,
    ref: 'City',
    required: [true, 'City required'],
  },
  created: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Ad = mongoose.model('Ad', AdSchema);
module.exports = Ad;
