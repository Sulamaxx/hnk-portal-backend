const Project = require('../models/Project ');

// Create Project
exports.createProject = async (req, res) => {
  try {
    const { name, description, employeeGroupId } = req.body;
    const newProject = new Project({ name, description, employeeGroup: employeeGroupId });
    const savedProject = await newProject.save();
    // Inform Beenz system about the employee interaction
    // Code to send a request to the Beenz system can be added here
    res.status(201).json({ savedProject, message: 'Project added successfully' });
  } catch (error) {
    if (error.message.startsWith("E11000 duplicate key error")) {
      return res.status(400).json({ message: 'Project already exists' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

// Read Project
exports.readProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const foundProject = await Project.findById(projectId).populate('employeeGroup').populate('members');
    if (!foundProject) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    // Inform Beenz system about the employee interaction
    // Code to send a request to the Beenz system can be added here
    res.status(200).json(foundProject);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { name, description, employeeGroupId } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { name, description, employeeGroup: employeeGroupId },
      { new: true }
    ).populate('employeeGroup', 'name');
    if (!updatedProject) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    // Inform Beenz system about the employee interaction
    // Code to send a request to the Beenz system can be added here
    res.status(200).json({ updatedProject, message: 'Project Updated successfully' });
  } catch (error) {
    if (error.message.startsWith("Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection:")) {
      return res.status(400).json({ message: 'Project name already exists' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    // Inform Beenz system about the employee interaction
    // Code to send a request to the Beenz system can be added here
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all Projects
exports.allProject = async (req, res) => {
  try {
    const allProjects = await Project.find().populate('employeeGroup');
    // Inform Beenz system about the employee interaction
    // Code to send a request to the Beenz system can be added here
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
