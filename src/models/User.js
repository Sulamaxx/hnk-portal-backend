// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee', 'client'], required: true },
  refreshToken: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
