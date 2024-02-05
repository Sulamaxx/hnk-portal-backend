const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  // Other announcement details
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
