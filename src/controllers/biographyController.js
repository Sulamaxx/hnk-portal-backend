// Inside your biography controller or routes

// Create Biography (H&K Employee)
exports.createBiography = async (req, res) => {
    try {
      // Check if the requesting user is an H&K Employee
      if (req.user.role !== 'hkemployee') {
        return res.status(403).json({ message: 'Permission denied. Only H&K Employees can create biographies.' });
      }
  
      const { details } = req.body;
      // Assuming you have a Biography model or schema, create a new biography
      const newBiography = new Biography({ details });
      const savedBiography = await newBiography.save();
  
      res.status(201).json(savedBiography);
    } catch (error) {
      console.error('Error in createBiography route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Read Biography (H&K Employee)
  exports.readBiography = async (req, res) => {
    try {
      // Assuming you have a Biography model or schema, find and return the requested biography
      const biographyId = req.params.id;
      const foundBiography = await Biography.findById(biographyId);
  
      if (!foundBiography) {
        return res.status(404).json({ message: 'Biography not found' });
      }
  
      res.status(200).json(foundBiography);
    } catch (error) {
      console.error('Error in readBiography route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Update Biography (H&K Employee)
  exports.updateBiography = async (req, res) => {
    try {
      // Check if the requesting user is an H&K Employee
      if (req.user.role !== 'hkemployee') {
        return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update biographies.' });
      }
  
      const biographyId = req.params.id;
      const { details } = req.body;
      // Assuming you have a Biography model or schema, find, update, and return the updated biography
      const updatedBiography = await Biography.findByIdAndUpdate(
        biographyId,
        { details },
        { new: true }
      );
  
      if (!updatedBiography) {
        return res.status(404).json({ message: 'Biography not found' });
      }
  
      res.status(200).json(updatedBiography);
    } catch (error) {
      console.error('Error in updateBiography route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Delete Biography (H&K Employee)
  exports.deleteBiography = async (req, res) => {
    try {
      // Check if the requesting user is an H&K Employee
      if (req.user.role !== 'hkemployee') {
        return res.status(403).json({ message: 'Permission denied. Only H&K Employees can delete biographies.' });
      }
  
      const biographyId = req.params.id;
      // Assuming you have a Biography model or schema, find and delete the biography
      const deletedBiography = await Biography.findByIdAndDelete(biographyId);
  
      if (!deletedBiography) {
        return res.status(404).json({ message: 'Biography not found' });
      }
  
      res.status(200).json({ message: 'Biography deleted successfully' });
    } catch (error) {
      console.error('Error in deleteBiography route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  