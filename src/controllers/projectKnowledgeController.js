const ProjectKnowledgeDocument = require("../models/ProjectKnowledgeDocument");

// Create Project Knowledge Document (H&K Employee only)
exports.createProjectKnowledgeDocument = async (req, res) => {
  try {
    const { title, content, type, projectId } = req.body;

    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can create project knowledge documents.' });
    }

    const newProjectKnowledgeDocument = new ProjectKnowledgeDocument({
      title: title,
      content: content,
      type: type,
      createdBy: req.cookies.userId,
      projectId: projectId
    });

    // Logic to handle emails (sending data to salsa system)
    // You may need to implement this part based on your use case

    const savedDocument = await newProjectKnowledgeDocument.save().populate('projectId');

    // Inform the beenz system about the employee interaction
    // You may need to implement this part based on your integration with the beenz system

    res.status(201).json({ savedDocument, message: 'success' });
  } catch (error) {
    console.error('Error in createProjectKnowledgeDocument route:', error);
    res.status(500).json({ message: error.message });
  }
};


// Read Project Knowledge Document (All authenticated users)
exports.readProjectKnowledgeDocument = async (req, res) => {
  try {
    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can create project knowledge documents.' });
    }
    const documentId = req.params.id;

    const foundDocument = await ProjectKnowledgeDocument.findById(documentId).populate('projectId');

    if (!foundDocument) {
      return res.status(404).json({ message: 'Project knowledge document not found' });
    }

    // Inform the beenz system about the employee interaction
    // You may need to implement this part based on your integration with the beenz system

    res.status(200).json(foundDocument).populate('projectId');
  } catch (error) {
    console.error('Error in readProjectKnowledgeDocument route:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update Project Knowledge Document (H&K Employee only)
exports.updateProjectKnowledgeDocument = async (req, res) => {
  try {
    const documentId = req.params.id;
    const { title, content, type, projectId } = req.body;

    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update project knowledge documents.' });
    }

    const updatedDocument = await ProjectKnowledgeDocument.findByIdAndUpdate(
      documentId,
      { title, content, type, projectId },
      { new: true }
    ).populate('projectId');

    if (!updatedDocument) {
      return res.status(404).json({ message: 'Project knowledge document not found' });
    }

    // Inform the beenz system about the employee interaction
    // You may need to implement this part based on your integration with the beenz system

    res.status(200).json({ updatedDocument, message: 'Successfully Updated' });
  } catch (error) {
    console.error('Error in updateProjectKnowledgeDocument route:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Project Knowledge Document (H&K Employee only)
exports.deleteProjectKnowledgeDocument = async (req, res) => {
  try {
    const documentId = req.params.id;

    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can delete project knowledge documents.' });
    }

    const deletedDocument = await ProjectKnowledgeDocument.findByIdAndDelete(documentId).populate('projectId');

    if (!deletedDocument) {
      return res.status(404).json({ message: 'Project knowledge document not found' });
    }

    // Inform the beenz system about the employee interaction
    // You may need to implement this part based on your integration with the beenz system

    res.status(200).json({ message: 'Project knowledge document deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProjectKnowledgeDocument route:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all Project Knowledge Documents (All authenticated users)
exports.allProjectKnowledgeDocuments = async (req, res) => {
  try {
    // Check if the requesting user is an H&K Employee
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can delete project knowledge documents.' });
    }
    const allDocuments = await ProjectKnowledgeDocument.find().populate('projectId');
    res.status(200).json({ allDocuments, message: 'success' });
  } catch (error) {
    console.error('Error in allProjectKnowledgeDocuments route:', error);
    res.status(500).json({ message: error.message });
  }
};
