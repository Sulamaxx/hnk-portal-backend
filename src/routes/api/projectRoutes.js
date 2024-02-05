const express = require('express');
const projectController = require('../../controllers/projectController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/projects', authMiddleware, projectController.createProject);
router.get('/projects/:id', authMiddleware, projectController.readProject);
router.put('/projects/:id', authMiddleware, projectController.updateProject);
router.delete('/projects/:id', authMiddleware, projectController.deleteProject);
router.get('/projects', authMiddleware, projectController.allProject);

module.exports = router;
