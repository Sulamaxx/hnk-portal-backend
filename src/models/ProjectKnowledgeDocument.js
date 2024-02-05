const mongoose = require('mongoose');

const projectKnowledgeDocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String },
  // Other project knowledge document details
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});

const ProjectKnowledgeDocument = mongoose.model('ProjectKnowledgeDocument', projectKnowledgeDocumentSchema);

module.exports = ProjectKnowledgeDocument;
