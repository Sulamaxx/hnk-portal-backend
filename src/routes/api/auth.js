// src/routes/api/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const authMiddleware = require('../../middlewares/authMiddleware');

// Function to generate a new refresh token
const generateRefreshToken = () => {
  return jwt.sign({}, keys.refreshTokenSecret, { expiresIn: '7d' });
};

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, keys.secretOrKey, { expiresIn: '1h' });
    const refreshToken = generateRefreshToken();

    // Add the previous access token to the revokedTokens array
    if (req.body.previousAccessToken) {
      user.revokedTokens.push(req.body.previousAccessToken);
    }

    user.refreshToken = refreshToken;
    await user.save();

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
    console.error('Error in login route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Example of a protected route using the middleware
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Refresh token route
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const user = await User.findOne({ refreshToken });

    if (!user || user.revokedTokens.includes(refreshToken)) {
      return res.status(401).json({ message: 'Invalid or revoked refresh token' });
    }

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, keys.secretOrKey, { expiresIn: '1h' });

    res.status(200).json({ accessToken, message: 'Token refreshed successfully' });
  } catch (error) {
    console.error('Error in refresh route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Logout route
router.post('/logout', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the current refresh token to revokedTokens
    user.revokedTokens.push(user.refreshToken);
    user.refreshToken = null;
    await user.save();

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error in logout route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
