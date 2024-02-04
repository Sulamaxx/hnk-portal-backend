// src/routes/index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./api/auth');
const registerRoutes = require('./api/register');
const userRoutes = require('./api/user');

// Use routes
router.use('/api/auth', authRoutes);
router.use('/api/register', registerRoutes);
router.use('/api/users', userRoutes);

module.exports = router;

