// src/models/User.js
const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please enter first name']
  },

  last_name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },

  address: { type: String, required: true },
  mobile: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['admin', 'employee', 'client'], required: true },
  refreshToken: { type: String },
  revokedTokens: [{ type: String }],
  img: { type: String },
  createdAt: { type: Date, default: Date.now },
  companyName: { type: String },
  description: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
