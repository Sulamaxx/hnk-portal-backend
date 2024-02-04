const User = require('../models/User');

exports.getUsersByRole = async (req, res) => {
    // Your get users by role logic here
    const { role } = req.params;

    try {
        // Check if the user making the request has the required role (admin, for example)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized: Insufficient privileges' });
        }

        const users = await User.find({ role }, { password: 0, refreshToken: 0 });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: `No users found for role ${role}` });
        }

        // Return Users
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllUsers = async (req, res) => {
    // Your get all users logic here
    try {
        // Check if the user making the request has the required role (admin, for example)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized: Insufficient privileges' });
        }

        // Retrieve all users from the database
        const users = await User.find({}, { password: 0, refreshToken: 0 }); // Exclude password and refreshToken fields

        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    // Your get user by ID logic here
    // Admin requests to view a specific user by providing its identifier
    const userId = req.params.userId;

    try {
        // System retrieves the requested user information.
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // The user details are displayed to the admin.
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error in read user route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    // Your update user logic here
    // Admin selects the user to be updated.
    const userId = req.params.userId;
    const updatedUserData = req.body;

    try {
        // System displays the current user details.
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Admin modifies the details of the user.
        // System validates the user details
        Object.assign(user, updatedUserData);
        await user.save();

        // System updates the user with the new information and shows success message
        res.status(200).json({ user, message: 'User updated successfully' });
    } catch (error) {
        console.error('Error in update user route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    // Your delete user logic here
    // Admin selects the user to be deleted.
    const userId = req.params.userId;

    try {
        // System prompts the admin for confirmation.
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Admin confirms the deletion.
        await user.remove();

        // System removes the user from the database and shows success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error in delete user route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.searchUsers = async (req, res) => {
    // Your search users logic here
    // Admin performs a search by providing a query string
    const searchQuery = req.query.q;

    try {
        // System retrieves users based on the search query.
        const users = await User.find({
            $or: [
                { first_name: { $regex: new RegExp(searchQuery, 'i') } }, // Case-insensitive search for first name
                { email: { $regex: new RegExp(searchQuery, 'i') } }, // Case-insensitive search for email
                { username: { $regex: new RegExp(searchQuery, 'i') } } // Case-insensitive search for username
            ]
        });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found for the given search query' });
        }

        // Display the search results to the admin.
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error in search users route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
