const Project = require('../models/Project ');

// Create Project
exports.createProject = async (req, res) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update credential packages.' });
    }
    const { name, description, employeeGroup, client } = req.body;
    const newProject = new Project({ name, description, employeeGroup, client });
    const savedProject = (await newProject.save());

    // Inform Beenz system about the employee interaction
    // Code to send a request to the Beenz system can be added here

    res.status(201).json({ savedProject: savedProject, message: 'Project added successfully' });
  } catch (error) {
    if (error.message.startsWith("E11000 duplicate key error")) {
      return res.status(400).json({ message: 'Project already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

// Read Project
exports.readProject = async (req, res) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update credential packages.' });
    }
    const projectId = req.params.id;
    const foundProject = await Project.findById(projectId).populate({
      path: 'employeeGroup',
      populate: {
        path: 'members',
        select: 'first_name last_name email address mobile role',
      }
    }).populate({
      path: 'client',
      select: 'first_name last_name email address mobile role',
    });
    if (!foundProject) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    // Inform Beenz system about the employee interaction
    // Code to send a request to the Beenz system can be added here
    res.status(200).json({ foundProject, message: 'success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update Project
exports.updateProject = async (req, res) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update credential packages.' });
    }
    const projectId = req.params.id;
    const { name, description, employeeGroupId } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { name, description, employeeGroup: employeeGroupId },
      { new: true }
    ).populate({
      path: 'employeeGroup',
      populate: {
        path: 'members',
        select: 'first_name last_name email address mobile role',
      }
    }).populate({
      path: 'client',
      select: 'first_name last_name email address mobile role',
    });
    if (!updatedProject) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    // Inform Beenz system about the employee interaction
    // Code to send a request to the Beenz system can be added here
    res.status(200).json({ updatedProject, message: 'Project Updated successfully' });
  } catch (error) {
    if (error.message.startsWith("Plan executor error during findAndModify")) {
      return res.status(400).json({ message: 'Project name already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update credential packages.' });
    }
    const projectId = req.params.id;
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    // Inform Beenz system about the employee interaction
    // Code to send a request to the Beenz system can be added here
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all Projects
exports.allProject = async (req, res) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Permission denied. Only H&K Employees can update credential packages.' });
    }
    const allProjects = await Project.find().populate({
      path: 'employeeGroup',
      populate: {
        path: 'members',
        select: 'first_name last_name email address mobile role',
      }

    }).populate({
      path: 'client',
      select: 'first_name last_name email address mobile role',
    });

    // Inform Beenz system about the employee interaction
    // Code to send a request to the Beenz system can be added here
    res.status(200).json({ allProjects, message: 'success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
