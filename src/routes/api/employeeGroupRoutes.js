const express = require('express');
const groupController = require('../../controllers/employeeGroupController');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();
// add
router.post('/employee-groups', authMiddleware, groupController.createGroup);
// get all
router.get('/employee-groups', authMiddleware, groupController.allGroup);
// get all by status
router.get('/employee-groups/stats', authMiddleware, groupController.allGroupStatus);
// get by id
router.get('/employee-groups/:id', authMiddleware, groupController.readGroup);
// update by id
router.put('/employee-groups/:id', authMiddleware, groupController.updateGroup);
// update by id the completed tasks stats
router.put('/employee-groups/task/:id', authMiddleware, groupController.updateGroupTasks);
// delete by id
router.delete('/employee-groups/:id', authMiddleware, groupController.deleteGroup);
module.exports = router;
