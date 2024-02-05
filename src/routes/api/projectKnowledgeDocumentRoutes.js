const express = require('express');
const projectKnowledgeController = require('../../controllers/projectKnowledgeController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/projectKnowledges', authMiddleware, projectKnowledgeController.createProjectKnowledgeDocument);

router.get('/projectKnowledges/:id', authMiddleware, projectKnowledgeController.readProjectKnowledgeDocument);

router.put('/projectKnowledges/:id', authMiddleware, projectKnowledgeController.updateProjectKnowledgeDocument);
router.delete('/projectKnowledges/:id', authMiddleware, projectKnowledgeController.deleteProjectKnowledgeDocument);

router.get('/projectKnowledges', authMiddleware, projectKnowledgeController.allProjectKnowledgeDocuments);

module.exports = router;