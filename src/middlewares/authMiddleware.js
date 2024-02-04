// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), keys.secretOrKey);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    const user = await User.findById(decoded.userId);

    if (!user || user.revokedTokens.includes(token.replace('Bearer ', ''))) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or revoked token' });
    }

    req.user = { userId: user._id, role: user.role };
    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
