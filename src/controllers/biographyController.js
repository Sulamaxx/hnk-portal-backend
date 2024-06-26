const Biography = require('../models/Biography');

// Create Biography
exports.createBiography = async (req, res) => {
  try {
    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can create biographies.' });
    }
    const { content } = req.body;

    const newBiography = new Biography({
      content: content,
      author: req.cookies.userId
    });
    const savedBiography = (await newBiography.save());
    res.status(201).json({ savedBiography: savedBiography, message: 'success' });
  } catch (error) {
    if (error.message.startsWith("E11000 duplicate key error")) {
      return res.status(400).json({ message: 'Employee has already biography' });
    } else {
      console.error('Error in createBiography route:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

// Read Biography
exports.readBiography = async (req, res) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can create biographies.' });
    }
    const authorId = req.cookies.userId;
    console.log(authorId)
    const foundBiography = await Biography.findOne({ author: authorId }).populate({
      path: 'author',
      select: 'first_name last_name email address mobile'
    });

    if (!foundBiography) {
      return res.status(404).json({ message: 'Biography not found' });
    }

    res.status(200).json({ foundBiography, message: 'success' });
  } catch (error) {
    console.error('Error in readBiography route:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update Biography
exports.updateBiography = async (req, res) => {
  try {
    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update biographies.' });
    }
    const author = req.cookies.userId;
    const { content } = req.body;
    const updatedBiography = await Biography.findOneAndUpdate(
      { author: author },
      { content },
      { new: true }
    ).populate({
      path: 'author',
      select: 'first_name last_name email address mobile'
    });
    if (!updatedBiography) {
      return res.status(404).json({ message: 'Biography not found' });
    }
    res.status(200).json({ updatedBiography: updatedBiography, message: 'success' });
  } catch (error) {
    console.error('Error in updateBiography route:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Biography
exports.deleteBiography = async (req, res) => {
  try {
    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can delete biographies.' });
    }
    const author = req.cookies.userId;
    const deletedBiography = await Biography.findOneAndDelete({ author: author });
    if (!deletedBiography) {
      return res.status(404).json({ message: 'Biography not found' });
    }
    res.status(200).json({ message: 'Biography deleted successfully' });
  } catch (error) {
    console.error('Error in deleteBiography route:', error);
    res.status(500).json({ message: error.message });
  }
};
