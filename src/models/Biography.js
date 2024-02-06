const mongoose = require('mongoose');
const biographySchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, unique: true },
  createdAt: { type: Date, default: Date.now },
 });
const Biography = mongoose.model('Biography', biographySchema);
module.exports = Biography;
