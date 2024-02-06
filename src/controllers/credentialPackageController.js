const CredentialPackage = require("../models/credentialPackage");
// Create Credential Package (H&K Employee)
exports.createCredentialPackage = async (req, res) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can create credential packages.' });
    }
    const authorId = req.cookies.userId;
    const { details } = req.body;
    // Find existing credential package for the author
    const existingPackage = await CredentialPackage.findOne({ author: authorId });
    if (existingPackage) {
      // Combine existing details with new details
      existingPackage.details += ("-" + details);
      await existingPackage.save();
      res.status(200).json({ savedCredentialPackage: existingPackage, message: 'Successfully updated' });
    } else {
      // Create a new credential package if none exists for the author
      const newCredentialPackage = new CredentialPackage({ details: details, author: authorId });
      const savedCredentialPackage = await newCredentialPackage.save();
      res.status(201).json({ savedCredentialPackage: savedCredentialPackage, message: 'Successfully created' });
    }
  } catch (error) {
    console.error('Error in createCredentialPackage route:', error);
    res.status(500).json({ message: error.message });
  }
};

// Read Credential Package (H&K Employee)
exports.readCredentialPackage = async (req, res) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied.Only H&K Employees can create credential packages.' });
    }
    const authorId = req.cookies.userId;
    const foundCredentialPackage = await CredentialPackage.findOne({ author: authorId });
    if (!foundCredentialPackage) {
      return res.status(404).json({ message: 'Credential package not found' });
    }
    res.status(200).json({ foundCredentialPackage: foundCredentialPackage, message: 'success' });
  } catch (error) {
    console.error('Error in readCredentialPackage route:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update Credential Package (H&K Employee)
exports.updateCredentialPackage = async (req, res) => {
  try {
    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update credential packages.' });
    }
    const authorId = req.cookies.userId;
    const { details } = req.body;
    const updatedCredentialPackage = await CredentialPackage.findOneAndUpdate(
      { author: authorId },
      { details },
      { new: true }
    );
    if (!updatedCredentialPackage) {
      return res.status(404).json({ message: 'Credential package not found' });
    }
    res.status(200).json({ updatedCredentialPackage: updatedCredentialPackage, message: 'successfully updated' });
  } catch (error) {
    console.error('Error in updateCredentialPackage route:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Credential Package (H&K Employee)
exports.deleteCredentialPackage = async (req, res) => {
  try {
    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can delete credential packages.' });
    }
    const authorId = req.cookies.userId;
    const deletedCredentialPackage = await CredentialPackage.findOneAndDelete({ author: authorId });
    if (!deletedCredentialPackage) {
      return res.status(404).json({ message: 'Credential package not found' });
    }
    res.status(200).json({ message: 'Credential package deleted successfully' });
  } catch (error) {
    console.error('Error in deleteCredentialPackage route:', error);
    res.status(500).json({ message: error.message });
  }
};
