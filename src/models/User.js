const mongoose = require('mongoose');
const { isEmail } = require('validator');
const EmployeeGroup = require('./EmployeeGroup');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  address: { type: String },
  mobile: { type: Number },
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    enum: ['admin', 'employee', 'client'],
    required: true,
  },
  refreshToken: { type: String },
  revokedTokens: [{ type: String }],
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  companyName: { type: String, default: null },
  description: { type: String, default: null },

  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EmployeeGroup' }],

  folders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }],
  preferences: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientPreferences' },


});

userSchema.pre('remove', async function (next) {
  try {
    await EmployeeGroup.updateMany({ members: this._id }, { $pull: { members: this._id } });
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
