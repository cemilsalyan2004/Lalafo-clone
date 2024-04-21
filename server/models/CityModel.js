const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
});

const City = mongoose.model('City', CitySchema);
module.exports = City;
