const express = require('express');
const projectController = require('../../controllers/projectController');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();
// add
router.post('/projects', authMiddleware, projectController.createProject);
// get by id
router.get('/projects/:id', authMiddleware, projectController.readProject);
// update by id
router.put('/projects/:id', authMiddleware, projectController.updateProject);
// delete by id
router.delete('/projects/:id', authMiddleware, projectController.deleteProject);
// get all
router.get('/projects', authMiddleware, projectController.allProject);
module.exports = router;
