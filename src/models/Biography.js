const mongoose = require('mongoose');

const biographySchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  // Add other biography details as needed
});

const Biography = mongoose.model('Biography', biographySchema);

module.exports = Biography;
