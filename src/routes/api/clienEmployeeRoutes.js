const express = require('express');
const clientEmployeeController = require('../../controllers/clientEmployeeController');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();
// view biography
router.get('/biography', authMiddleware, clientEmployeeController.viewBiography);
// view folder
router.get('/folders', authMiddleware, clientEmployeeController.viewProjectKnowledgeFolders);
module.exports = router;
