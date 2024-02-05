
// Create Credential Package (H&K Employee)
exports.createCredentialPackage = async (req, res) => {
    try {
      // Check if the requesting user is an H&K Employee
      if (req.user.role !== 'employee') {
        return res.status(403).json({ message: 'Permission denied. Only H&K Employees can create credential packages.' });
      }
  
      const { details, existingPackageId } = req.body;
  
      // Assuming you have a CredentialPackage model or schema
      const newCredentialPackage = new CredentialPackage({ details });
  
      if (existingPackageId) {
        // Repackage from an existing credential package
        const existingPackage = await CredentialPackage.findById(existingPackageId);
  
        if (!existingPackage) {
          return res.status(404).json({ message: 'Existing credential package not found' });
        }
  
        newCredentialPackage.data = existingPackage.data;
      }
  
      const savedCredentialPackage = await newCredentialPackage.save();
      res.status(201).json(savedCredentialPackage);
    } catch (error) {
      console.error('Error in createCredentialPackage route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Read Credential Package (H&K Employee)
  exports.readCredentialPackage = async (req, res) => {
    try {
      // Assuming you have a CredentialPackage model or schema, find and return the requested credential package
      const credentialPackageId = req.params.id;
      const foundCredentialPackage = await CredentialPackage.findById(credentialPackageId);
  
      if (!foundCredentialPackage) {
        return res.status(404).json({ message: 'Credential package not found' });
      }
  
      res.status(200).json(foundCredentialPackage);
    } catch (error) {
      console.error('Error in readCredentialPackage route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Update Credential Package (H&K Employee)
  exports.updateCredentialPackage = async (req, res) => {
    try {
      // Check if the requesting user is an H&K Employee
      if (req.user.role !== 'employee') {
        return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update credential packages.' });
      }
  
      const credentialPackageId = req.params.id;
      const { details } = req.body;
  
      // Assuming you have a CredentialPackage model or schema, find, update, and return the updated credential package
      const updatedCredentialPackage = await CredentialPackage.findByIdAndUpdate(
        credentialPackageId,
        { details },
        { new: true }
      );
  
      if (!updatedCredentialPackage) {
        return res.status(404).json({ message: 'Credential package not found' });
      }
  
      res.status(200).json(updatedCredentialPackage);
    } catch (error) {
      console.error('Error in updateCredentialPackage route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Delete Credential Package (H&K Employee)
  exports.deleteCredentialPackage = async (req, res) => {
    try {
      // Check if the requesting user is an H&K Employee
      if (req.user.role !== 'employee') {
        return res.status(403).json({ message: 'Permission denied. Only H&K Employees can delete credential packages.' });
      }
  
      const credentialPackageId = req.params.id;
      // Assuming you have a CredentialPackage model or schema, find and delete the credential package
      const deletedCredentialPackage = await CredentialPackage.findByIdAndDelete(credentialPackageId);
  
      if (!deletedCredentialPackage) {
        return res.status(404).json({ message: 'Credential package not found' });
      }
  
      res.status(200).json({ message: 'Credential package deleted successfully' });
    } catch (error) {
      console.error('Error in deleteCredentialPackage route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  