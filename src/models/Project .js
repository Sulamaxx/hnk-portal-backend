const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Other project details
  description: { type: String },
  // Relationship with EmployeeGroup - Assume a project is associated with an employee group
  employeeGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeGroup' },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
