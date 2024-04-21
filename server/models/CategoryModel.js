const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
