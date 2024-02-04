// src/routes/api/user.js
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const authMiddleware = require('../../middlewares/authMiddleware');

// Get all users for a given role
router.get('/role/:role', authMiddleware, async (req, res) => {
  const { role } = req.params;

  try {
    // Check if the user making the request has the required role (admin, for example)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Insufficient privileges' });
    }

    const users = await User.find({ role }, { password: 0, refreshToken: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: `No users found for role ${role}` });
    }

    // Return Users
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users (admin-only route)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    // Check if the user making the request has the required role (admin, for example)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Insufficient privileges' });
    }

    // Retrieve all users from the database
    const users = await User.find({}, { password: 0, refreshToken: 0 }); // Exclude password and refreshToken fields

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
