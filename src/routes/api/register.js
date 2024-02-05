// src/routes/api/register.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const authMiddleware = require('../../middlewares/authMiddleware');

const multer = require('multer');
// const upload = multer({ dest: 'uploads/img/' });
const upload = multer({
  dest: 'uploads/img/',
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('File is not an image!'), false);
    }
    cb(null, true);
  },
});


router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  console.log('req.file:', req.file);
  const { first_name, last_name, email, address, mobile, username, password, role, companyName, description } = req.body;
  const image = req.file ? req.file.path : null;
  console.log('image:', image);

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Insufficient privileges' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      first_name,
      last_name,
      email,
      address,
      mobile,
      username,
      password: hashedPassword,
      role,
      image: role === 'client' ? image : undefined,
      companyName,
      description
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
