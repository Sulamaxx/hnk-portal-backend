// src/routes/api/user.js
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// Get all users for a given role
router.get('/:role', async (req, res) => {
  const { role } = req.params;

  try {
    const users = await User.find({ role });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
