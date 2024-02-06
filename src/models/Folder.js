const mongoose = require('mongoose');
const folderSchema = new mongoose.Schema([{
  name: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content:[{type: mongoose.Schema.Types.ObjectId, ref: 'ProjectKnowledgeDocument'}],
  createdAt: { type: Date, default: Date.now },
}]);
const Folder = mongoose.model('Folder', folderSchema);
module.exports = Folder;
