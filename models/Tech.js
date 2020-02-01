const mongoose = require('mongoose');

const TechSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  secondName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('tech', TechSchema);
