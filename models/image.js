const mongoose = require('mongoose');

const image = new mongoose.Schema({
  image_url: {
    type: String
  }
});

module.exports = Image = mongoose.model('image', image);
