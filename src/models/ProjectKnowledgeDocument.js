const mongoose = require('mongoose');
const projectKnowledgeDocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['Internal', 'External', 'ClientKnowledge'] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});
const ProjectKnowledgeDocument = mongoose.model('ProjectKnowledgeDocument', projectKnowledgeDocumentSchema);
module.exports = ProjectKnowledgeDocument;
