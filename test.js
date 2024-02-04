// // src/routes/api/auth.js
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../../models/User');
// const keys = require('../../config/keys');
// const authMiddleware = require('../../middlewares/authMiddleware');

// // Function to generate a new refresh token
// const generateRefreshToken = () => {
//   return jwt.sign({}, keys.refreshTokenSecret, { expiresIn: '7d' });
// };

// // Login route
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const accessToken = jwt.sign({ userId: user._id, role: user.role }, keys.secretOrKey, { expiresIn: '1h' });
//     const refreshToken = generateRefreshToken();

//     user.refreshToken = refreshToken;
//     user.revokedTokens.push(req.body.refreshToken);
//     await user.save();

//     const maxAge = 7 * 24 * 60 * 60;

//     // Set cookies for access token and refresh token
//     res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: maxAge * 1000 });
//     res.cookie('refreshToken', refreshToken, { httpOnly: true });

//     switch (user.role) {
//       case 'admin':
//         res.status(200).json({ accessToken, refreshToken, message: 'Admin login successful' });
//         break;
//       case 'employee':
//         res.status(200).json({ accessToken, refreshToken, message: 'Employee login successful' });
//         break;
//       case 'client':
//         res.status(200).json({ accessToken, refreshToken, message: 'Client login successful' });
//         break;
//       default:
//         res.status(200).json({ accessToken, refreshToken, message: 'Login successful' });
//         break;
//     }
//   } catch (error) {
//     console.error('Error in login route:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


// // Refresh token route
// router.post('/refresh', async (req, res) => {
//   const { refreshToken } = req.body;

//   try {
//     const user = await User.findOne({ refreshToken });

//     if (!user || user.revokedTokens.includes(refreshToken)) {
//       return res.status(401).json({ message: 'Invalid or revoked refresh token' });
//     }

//     const accessToken = jwt.sign({ userId: user._id, role: user.role }, keys.secretOrKey, { expiresIn: '1h' });

//     res.status(200).json({ accessToken, message: 'Token refreshed successfully' });
//   } catch (error) {
//     console.error('Error in refresh route:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Logout route
// router.post('/logout', authMiddleware, async (req, res) => {
//   const userId = req.user.userId;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.revokedTokens.push(user.accessToken); // Add the current refresh token to revokedTokens
//     user.refreshToken = null;
//     await user.save();

//      // Clear cookies
//      res.clearCookie('accessToken');
//      res.clearCookie('refreshToken');

//     res.status(200).json({ message: 'Logout successful' });
//   } catch (error) {
//     console.error('Error in logout route:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// module.exports = router;










// // middlewares/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const keys = require('../config/keys');
// const User = require('../models/User');

// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.accessToken;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: Missing token' });
//   }

//   try {
//     const decoded = jwt.verify(token, keys.secretOrKey);

//     if (!decoded || !decoded.userId) {
//       return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }

//     const user = await User.findById(decoded.userId);

//     if (!user || user.revokedTokens.includes(token)) {
//       return res.status(401).json({ message: 'Unauthorized: Invalid or revoked token' });
//     }

//     req.user = { userId: user._id, role: user.role };
//     next();
//   } catch (error) {
//     console.error('Error in authMiddleware:', error);
//     res.status(401).json({ message: 'Unauthorized: Invalid token' });
//   }
// };

// module.exports = authMiddleware;



















// // src/routes/api/user.js
// const express = require('express');
// const router = express.Router();
// const User = require('../../models/User');
// const authMiddleware = require('../../middlewares/authMiddleware');

// // Get all users for a given role
// router.get('/role/:role', authMiddleware, async (req, res) => {
//   const { role } = req.params;

//   try {
//     // Check if the user making the request has the required role (admin, for example)
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Unauthorized: Insufficient privileges' });
//     }

//     const users = await User.find({ role }, { password: 0, refreshToken: 0 });
//     if (!users || users.length === 0) {
//       return res.status(404).json({ message: `No users found for role ${role}` });
//     }

//     // Return Users
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get all users (admin-only route)
// router.get('/all', authMiddleware, async (req, res) => {
//   try {
//     // Check if the user making the request has the required role (admin, for example)
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Unauthorized: Insufficient privileges' });
//     }

//     // Retrieve all users from the database
//     const users = await User.find({}, { password: 0, refreshToken: 0 }); // Exclude password and refreshToken fields

//     res.status(200).json({ users });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// module.exports = router;













