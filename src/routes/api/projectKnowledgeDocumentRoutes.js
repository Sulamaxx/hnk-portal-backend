const express = require('express');
const projectKnowledgeController = require('../../controllers/projectKnowledgeController');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();
// add
router.post('/projectKnowledges', authMiddleware, projectKnowledgeController.createProjectKnowledgeDocument);
// get by id
router.get('/projectKnowledges/:id', authMiddleware, projectKnowledgeController.readProjectKnowledgeDocument);
// update by id
router.put('/projectKnowledges/:id', authMiddleware, projectKnowledgeController.updateProjectKnowledgeDocument);
// delete by id
router.delete('/projectKnowledges/:id', authMiddleware, projectKnowledgeController.deleteProjectKnowledgeDocument);
// get all
router.get('/projectKnowledges', authMiddleware, projectKnowledgeController.allProjectKnowledgeDocuments);
module.exports = router;