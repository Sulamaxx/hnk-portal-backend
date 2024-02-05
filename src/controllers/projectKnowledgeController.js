
// Create Project Knowledge Document (H&K Employee only)
exports.createProjectKnowledgeDocument = async (req, res) => {
    try {
      const { title, content, type } = req.body;
  
      // Check if the requesting user is an H&K Employee
      if (req.user.role !== 'employee') {
        return res.status(403).json({ message: 'Permission denied. Only H&K Employees can create project knowledge documents.' });
      }
  
      const newProjectKnowledgeDocument = new ProjectKnowledgeDocument({
        title,
        content,
        type,
        createdBy: req.user._id
      });
  
      // Logic to handle emails (sending data to salsa system)
      // You may need to implement this part based on your use case
  
      const savedDocument = await newProjectKnowledgeDocument.save();
  
      // Inform the beenz system about the employee interaction
      // You may need to implement this part based on your integration with the beenz system
  
      res.status(201).json(savedDocument);
    } catch (error) {
      console.error('Error in createProjectKnowledgeDocument route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Read Project Knowledge Document (All authenticated users)
  exports.readProjectKnowledgeDocument = async (req, res) => {
    try {
      const documentId = req.params.id;
  
      const foundDocument = await ProjectKnowledgeDocument.findById(documentId).populate('createdBy', 'username');
  
      if (!foundDocument) {
        return res.status(404).json({ message: 'Project knowledge document not found' });
      }
  
      // Inform the beenz system about the employee interaction
      // You may need to implement this part based on your integration with the beenz system
  
      res.status(200).json(foundDocument);
    } catch (error) {
      console.error('Error in readProjectKnowledgeDocument route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Update Project Knowledge Document (H&K Employee only)
  exports.updateProjectKnowledgeDocument = async (req, res) => {
    try {
      const documentId = req.params.id;
      const { title, content, type } = req.body;
  
      // Check if the requesting user is an H&K Employee
      if (req.user.role !== 'hkemployee') {
        return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update project knowledge documents.' });
      }
  
      const updatedDocument = await ProjectKnowledgeDocument.findByIdAndUpdate(
        documentId,
        { title, content, type },
        { new: true }
      ).populate('createdBy', 'username');
  
      if (!updatedDocument) {
        return res.status(404).json({ message: 'Project knowledge document not found' });
      }
  
      // Inform the beenz system about the employee interaction
      // You may need to implement this part based on your integration with the beenz system
  
      res.status(200).json(updatedDocument);
    } catch (error) {
      console.error('Error in updateProjectKnowledgeDocument route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Delete Project Knowledge Document (H&K Employee only)
  exports.deleteProjectKnowledgeDocument = async (req, res) => {
    try {
      const documentId = req.params.id;
  
      // Check if the requesting user is an H&K Employee
      if (req.user.role !== 'hkemployee') {
        return res.status(403).json({ message: 'Permission denied. Only H&K Employees can delete project knowledge documents.' });
      }
  
      const deletedDocument = await ProjectKnowledgeDocument.findByIdAndDelete(documentId);
  
      if (!deletedDocument) {
        return res.status(404).json({ message: 'Project knowledge document not found' });
      }
  
      // Inform the beenz system about the employee interaction
      // You may need to implement this part based on your integration with the beenz system
  
      res.status(200).json({ message: 'Project knowledge document deleted successfully' });
    } catch (error) {
      console.error('Error in deleteProjectKnowledgeDocument route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Get all Project Knowledge Documents (All authenticated users)
  exports.allProjectKnowledgeDocuments = async (req, res) => {
    try {
      const allDocuments = await ProjectKnowledgeDocument.find().populate('createdBy', 'username');
      res.status(200).json(allDocuments);
    } catch (error) {
      console.error('Error in allProjectKnowledgeDocuments route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  