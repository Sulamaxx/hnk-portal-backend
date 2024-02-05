const express = require('express');
const projectKnowledgeController = require('../../controllers/projectKnowledgeController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/projectKnowledges', authMiddleware, projectKnowledgeController.createProjectKnowledgeDocument);

router.get('/projectKnowledges/:id', authMiddleware, projectController.readProject);

router.put('/projectKnowledges/:id', authMiddleware, projectController.updateProject);
router.delete('/projectKnowledges/:id', authMiddleware, projectController.deleteProject);

router.get('/projectKnowledges', authMiddleware, projectController.allProject);

module.exports = router;