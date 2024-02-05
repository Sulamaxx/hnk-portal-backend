// Inside your client employee controller or routes

// View Home Page with Company Logo (Client Employee)
exports.viewHomePage = async (req, res) => {
    try {
      // Assuming you have a User model or schema with company information
      const userId = req.user.id;
      const clientEmployee = await User.findById(userId).populate('company', 'logo');
  
      if (!clientEmployee || !clientEmployee.company || !clientEmployee.company.logo) {
        // If the user or company information is not found or if the company logo is missing
        return res.status(404).json({ message: 'Client company information or logo not found' });
      }
  
      const { logo } = clientEmployee.company;
  
      res.status(200).json({ message: 'Successfully retrieved home page with company logo', logo });
    } catch (error) {
      console.error('Error in viewHomePage route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Inside your client employee controller or routes

// View Biography (Client Employee)
exports.viewBiography = async (req, res) => {
    try {
      // Assuming you have a Biography model or schema
      const biographyId = req.params.id;
      const foundBiography = await Biography.findById(biographyId);
  
      if (!foundBiography) {
        return res.status(404).json({ message: 'Biography not found' });
      }
  
      res.status(200).json(foundBiography);
    } catch (error) {
      console.error('Error in viewBiography route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
// Inside your client employee controller or routes

// View Project Knowledge via Folders (Client Employee)
exports.viewProjectKnowledgeFolders = async (req, res) => {
    try {
      // Assuming you have a Project model or schema and a Folder model or schema
      const clientId = req.user.id; // Assuming user object includes client information
      const selectedFolderId = req.params.folderId;
  
      // Fetch folders for the client
      const clientFolders = await Folder.find({ client: clientId });
  
      // Find the selected folder
      const selectedFolder = clientFolders.find(folder => folder._id.equals(selectedFolderId));
  
      if (!selectedFolder) {
        return res.status(404).json({ message: 'Folder not found for the client' });
      }
  
      // Fetch knowledge documents inside the selected folder
      const knowledgeDocuments = await KnowledgeDocument.find({ folder: selectedFolderId });
  
      res.status(200).json({ folder: selectedFolder, knowledgeDocuments });
    } catch (error) {
      console.error('Error in viewProjectKnowledgeFolders route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  // Inside your client employee controller or routes

// Change Folder Arrangement Preferences (Client Employee)
exports.changeFolderArrangementPreferences = async (req, res) => {
    try {
      const clientId = req.user.id; // Assuming user object includes client information
  
      // Fetch and update the client's folder arrangement preferences
      const clientPreferences = await ClientPreferences.findOne({ client: clientId });
  
      if (!clientPreferences) {
        // Create new preferences if not exist
        const newPreferences = new ClientPreferences({
          client: clientId,
          arrangement: req.body.arrangement, // Assuming the request body includes the new arrangement preferences
        });
        await newPreferences.save();
      } else {
        // Update existing preferences
        clientPreferences.arrangement = req.body.arrangement;
        await clientPreferences.save();
      }
  
      res.status(200).json({ message: 'Folder arrangement preferences updated successfully' });
    } catch (error) {
      console.error('Error in changeFolderArrangementPreferences route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  