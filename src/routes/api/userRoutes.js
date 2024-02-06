const express = require('express');
const userController = require('../../controllers/userController');
const clientEmployeeController = require('../../controllers/clientEmployeeController');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();
// General user routes
router.get('/role/:role', authMiddleware, userController.getUsersByRole);
router.get('/all', authMiddleware, userController.getAllUsers);
// // Read user routes
router.get('/read/:userId', authMiddleware, userController.getUserById);
// Update any given user routes
router.put('/update/:userId', authMiddleware, userController.updateUser);
// Delete any given user routes
router.delete('/delete/:userId', authMiddleware, userController.deleteUser);
// General user search
router.get('/search', authMiddleware, userController.searchUsers);
// Get all employees
router.get('/employees/all', authMiddleware, userController.getAllEmployees);
// Search employees
router.get('/employees/search', authMiddleware, userController.searchEmployees);
// Get all clients
router.get('/clients/all', authMiddleware, userController.getAllClients);
// Search clients
router.get('/clients/search', authMiddleware, userController.searchClients);
// client home page data
router.get('/clients/details', authMiddleware, clientEmployeeController.viewHomePage);
module.exports = router;
