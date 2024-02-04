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

    user.refreshToken = refreshToken;
    user.revokedTokens.push(req.cookies.accessToken);
    await user.save();

    const maxAge = 7 * 24 * 60 * 60;

    // Set cookies for access token and refresh token
    res.cookie('userId', user._id, { httpOnly: true, maxAge: maxAge * 1000 });
    res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: maxAge * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: maxAge * 1000 });

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


// Refresh token route
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.cookies.refreshToken;

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


router.get('/logout', async (req, res) => {
  const userId = req.cookies.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.revokedTokens.push(req.cookies.accessToken); // Add the current refresh token to revokedTokens
    user.refreshToken = null;
    await user.save();

    // Clear cookies
    res.clearCookie('userId');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error in logout route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
