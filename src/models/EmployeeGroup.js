const mongoose = require('mongoose');
const employeeGroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String },
  groupSize: { type: Number, default: function () { return this.members.length; } },
  tasksCompleted: { type: Number, default: 0 },
  engagementRate: {
    type: Number,
    default: function () {
      return this.groupSize > 0 ? this.tasksCompleted / this.groupSize : 0;
    },
  },
});
const EmployeeGroup = mongoose.model('EmployeeGroup', employeeGroupSchema);
module.exports = EmployeeGroup;
