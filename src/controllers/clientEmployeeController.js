const User = require("../models/User");
const Biography = require("../models/Biography");
const Folder = require("../models/Folder");
const Project = require("../models/Project ");
const ProjectKnowledgeDocument = require("../models/projectKnowledgeDocument");

// View Home Page with Company Logo (Client Employee) - image null uploading triger so at testing stage.
exports.viewHomePage = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const clientEmployee = await User.findById(userId);
    if (!clientEmployee || !clientEmployee.img) {
      // If the user or company information is not found or if the company logo is missing
      return res.status(404).json({ clientEmployee, message: 'Client company information or logo not found' });
    }
    // const { img: logo } = clientEmployee;
    res.status(200).json({ message: 'Successfully retrieved home page with company logo', clientEmployee });
  } catch (error) {
    console.error('Error in viewHomePage route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// View Biography (Client Employee)
exports.viewBiography = async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Permission denied. Only Client Employees can access this.' });
    }
    const foundBiography = await Biography.find().populate({
      path: 'author',
      select: 'first_name last_name email address mobile'
    });
    if (!foundBiography) {
      return res.status(404).json({ message: 'Biography not found' });
    }
    res.status(200).json(foundBiography);
  } catch (error) {
    console.error('Error in viewBiography route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//  View Project Knowledge via Folders (Client Employee)
exports.viewProjectKnowledgeFolders = async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Permission denied. Only Client Employees can access this.' });
    }
    const clientId = req.cookies.userId;
    const clientFolders = await Folder.find({ client: clientId });
    if (!clientFolders || clientFolders.length === 0) {
      // Create a new folder if none exists
      const newFolder = await new Folder({ name: "Default", client: clientId }).save();
      const allProjects = await Project.find({ client: clientId });
      const contentPromises = allProjects.map(async project => {
        const foundDocument = await ProjectKnowledgeDocument.findOne({ projectId: project._id });
        if (foundDocument) {
          newFolder.content.push(foundDocument);
        }
      });
      // Wait for all content promises to resolve
      await Promise.all(contentPromises);
      // Save the updated folder
      const updatedFolder = (await newFolder.save())
        .populate({
          path: 'content',
          populate: {
            path: 'projectId',
            select: '_id name description employeeGroup',
            populate: {
              path: 'employeeGroup',
              populate: {
                path: 'members',
                select: 'first_name last_name email address mobile role',
              }
            }
          }
        });
      res.status(200).json({ updatedFolder, message: 'Folder created and populated with documents.' });
    } else {
      // Use the existing folder if one exists
      const existingFolder = clientFolders[0]; // Assuming you only expect one folder per client
      // Update existing folder with knowledge documents
      const allProjects = await Project.find({ client: clientId });
      const contentPromises = allProjects.map(async project => {
        const foundDocument = await ProjectKnowledgeDocument.findOne({ projectId: project._id });
        if (foundDocument) {
          existingFolder.content.push(foundDocument);
        }
      });
      // Wait for all content promises to resolve
      await Promise.all(contentPromises);
      // Save the updated folder
      const updatedFolder = await existingFolder
        .populate({
          path: 'content',
          populate: {
            path: 'projectId',
            select: '_id name description employeeGroup',
            populate: {
              path: 'employeeGroup',
              populate: {
                path: 'members',
                select: 'first_name last_name email address mobile role',
              }
            }
          }
        });
      res.status(200).json({ updatedFolder, message: 'Folder updated with documents.' });
    }
  } catch (error) {
    console.error('Error in viewProjectKnowledgeFolders route:', error);
    res.status(500).json({ message: error.message });
  }
};

