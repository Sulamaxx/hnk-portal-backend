const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
   description: { type: String },
  employeeGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeGroup' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
