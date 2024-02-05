// src/routes/index.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./api/authRoutes');
const registerRoutes = require('./api/register');
const userRoutes = require('./api/userRoutes');
const announcementRoutes = require('./api/announcementRoutes');
const employeeGroupRoutes = require('./api/employeeGroupRoutes');
const projectRoutes = require('./api/projectRoutes');

const projectKnowledgeDocumentRoutes = require('./api/projectKnowledgeDocumentRoutes');
const biographyRoutes = require('./api/biographyRoutes');

// Use routes
router.use('/api/auth', authRoutes);
router.use('/api/register', registerRoutes);
router.use('/api/user', userRoutes);

router.use('/api', projectRoutes);
router.use('/api', announcementRoutes);
router.use('/api', employeeGroupRoutes);
router.use('/api', projectKnowledgeDocumentRoutes);

router.use('/api', biographyRoutes);


module.exports = router;

