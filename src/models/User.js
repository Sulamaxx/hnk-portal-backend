const mongoose = require('mongoose');
const { isEmail } = require('validator');

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
  img: { type: String },
  createdAt: { type: Date, default: Date.now },
  companyName: { type: String },
  description: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
