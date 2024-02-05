const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  // Add other folder details as needed
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;