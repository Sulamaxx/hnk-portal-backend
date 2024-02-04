// src/config/keys.js
require('dotenv').config();
module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.JWT_SECRET_KEY || 'fallbackSecretKey',
  refreshTokenSecret: process.env.JWT_SECRET_KEY || 'fallbackSecretKey',
};

