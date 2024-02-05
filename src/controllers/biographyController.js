const Biography = require('../models/Biography');
const User = require('../models/User');

// Create Biography (H&K Employee)
exports.createBiography = async (req, res) => {
  try {
    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can create biographies.' });
    }

    const { content } = req.body;
    // Assuming you have a Biography model or schema, create a new biography
    const newBiography = new Biography({
      content: content,
      author: req.cookies.userId
    });
    const savedBiography = (await newBiography.save()).populate('auther');

    res.status(201).json({ savedBiography: savedBiography, message: 'success' });
  } catch (error) {
    console.error('Error in createBiography route:', error);
    res.status(500).json({ message: error.message });
  }
};

// Read Biography (H&K Employee)
exports.readBiography = async (req, res) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can create biographies.' });
    }
    // Assuming you have a Biography model or schema, find and return the requested biography
    const authorId = req.cookies.userId;
    console.log(authorId)
    const foundBiography = await Biography.findOne({ author: authorId }).populate('author');

    if (!foundBiography) {
      return res.status(404).json({ message: 'Biography not found' });
    }

    res.status(200).json({ foundBiography, message: 'success' });
  } catch (error) {
    console.error('Error in readBiography route:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update Biography (H&K Employee)
exports.updateBiography = async (req, res) => {
  try {
    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update biographies.' });
    }

    const author = req.cookies.userId;
    const { content } = req.body;
    // Assuming you have a Biography model or schema, find, update, and return the updated biography
    const updatedBiography = await Biography.findOneAndUpdate(
      { author: author },
      { content },
      { new: true }
    );

    if (!updatedBiography) {
      return res.status(404).json({ message: 'Biography not found' });
    }

    res.status(200).json({ updatedBiography: updatedBiography, message: 'success' });
  } catch (error) {
    console.error('Error in updateBiography route:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Biography (H&K Employee)
exports.deleteBiography = async (req, res) => {
  try {
    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can delete biographies.' });
    }

    const author = req.cookies.userId;
    // Assuming you have a Biography model or schema, find and delete the biography
    const deletedBiography = await Biography.findOneAndDelete({ author: author });

    res.status(200).json({ message: 'Biography deleted successfully' });
  } catch (error) {
    console.error('Error in deleteBiography route:', error);
    res.status(500).json({ message: error.message });
  }
};
