const mongoose = require('mongoose');

const employeeGroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Other group details
  description: { type: String },
});

const EmployeeGroup = mongoose.model('EmployeeGroup', employeeGroupSchema);

module.exports = EmployeeGroup;
