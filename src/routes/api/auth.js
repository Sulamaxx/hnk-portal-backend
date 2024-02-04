// src/routes/api/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');

// Function to generate a new refresh token
const generateRefreshToken = () => {
  return jwt.sign({}, keys.refreshTokenSecret, { expiresIn: '7d' }); // You can adjust the expiration time
};

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a new access token
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, keys.secretOrKey, { expiresIn: '1h' });

    // Generate a new refresh token
    const refreshToken = generateRefreshToken();

    // Save the refresh token to the user model
    user.refreshToken = refreshToken;
    await user.save();

    // Provide different responses based on user role
    switch (user.role) {
      case 'admin':
        res.status(200).json({ accessToken, refreshToken, message: 'Admin login successful' });
        break;
      case 'employee':
        res.status(200).json({ accessToken, refreshToken, message: 'Employee login successful' });
        break;
      case 'client':
        res.status(200).json({ accessToken, refreshToken, message: 'Client login successful' });
        break;
      default:
        res.status(200).json({ accessToken, refreshToken, message: 'Login successful' });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
