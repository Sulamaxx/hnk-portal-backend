const express = require('express');
const userController = require('../../controllers/userController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/role/:role', authMiddleware, userController.getUsersByRole);
router.get('/all', authMiddleware, userController.getAllUsers);
router.get('/read/:userId', authMiddleware, userController.getUserById);
router.put('/update/:userId', authMiddleware, userController.updateUser);
router.delete('/delete/:userId', authMiddleware, userController.deleteUser);
router.get('/search', authMiddleware, userController.searchUsers);

module.exports = router;
