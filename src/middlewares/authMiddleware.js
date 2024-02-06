// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

// In here firstly used jwt taken system using header and make revokeing machanisum and at that time before exd time, the logning refresh previous access taken invalidated due tothe revoke machanisum. postman testing passed but at the front-end calling got issue some issue. tried to fix it but it wasted my time. after use below ware. req.cookies.accessToken 
const authMiddleware = async (req, res, next) => {
  // const token = req.header('Authorization');
  const token = req.cookies.accessToken;
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
