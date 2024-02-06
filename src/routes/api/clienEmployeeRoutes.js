const express = require('express');
const clientEmployeeController = require('../../controllers/clientEmployeeController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();


// router.post('/employee-groups', authMiddleware, clientEmployeeController.);

router.get('/biography', authMiddleware, clientEmployeeController.viewBiography);
router.get('/folders', authMiddleware, clientEmployeeController.viewProjectKnowledgeFolders);



// router.put('/employee-groups/task/:id', authMiddleware, clientEmployeeController.updateGroupTasks);
// router.delete('/employee-groups/:id', authMiddleware, clientEmployeeController.deleteGroup);

module.exports = router;
