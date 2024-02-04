// src/routes/index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./api/authRoutes');
const registerRoutes = require('./api/register');
const userRoutes = require('./api/userRoutes');

// Use routes
router.use('/api/auth', authRoutes);
router.use('/api/register', registerRoutes);
router.use('/api/user', userRoutes);

module.exports = router;

