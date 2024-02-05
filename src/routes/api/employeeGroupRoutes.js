const express = require('express');
const groupController = require('../../controllers/employeeGroupController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();


router.post('/employee-groups', authMiddleware, groupController.createGroup);
router.get('/employee-groups', authMiddleware, groupController.allGroup);
router.get('/employee-groups/:id', authMiddleware, groupController.readGroup);
router.put('/employee-groups/:id', authMiddleware, groupController.updateGroup);
router.delete('/employee-groups/:id', authMiddleware, groupController.deleteGroup);

module.exports = router;
