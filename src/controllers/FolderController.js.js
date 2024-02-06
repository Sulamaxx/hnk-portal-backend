const Folder = require('../models/Folder');

exports.getFolders = async (req, res) => {
  try {
    const clientId = req.user._id; // Assuming user ID is stored in req.user

    const folders = await Folder.find({ client: clientId });
    res.status(200).json({ folders });
  } catch (error) {
    console.error('Error in getFolders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createFolder = async (req, res) => {
  try {
    const clientId = req.user._id; // Assuming user ID is stored in req.user
    const { name } = req.body;

    const existingFolder = await Folder.findOne({ name, client: clientId });
    if (existingFolder) {
      return res.status(400).json({ message: 'Folder with the same name already exists for the client' });
    }

    const newFolder = new Folder({ name, client: clientId });
    await newFolder.save();

    res.status(201).json({ message: 'Folder created successfully', folder: newFolder });
  } catch (error) {
    console.error('Error in createFolder:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
