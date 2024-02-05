const EmployeeGroup = require('../models/EmployeeGroup');
// Create EmployeeGroup
exports.createGroup = async (req, res) => {
    try {
        const { name, members, description } = req.body;
        const newEmployeeGroup = new EmployeeGroup({ name, members, description });
        const savedEmployeeGroup = await newEmployeeGroup.save();
        res.status(201).json({ savedEmployeeGroup, message: 'Employee group added successfully' });
    } catch (error) {
        if (error.message.startsWith("E11000 duplicate key error")) {
            return res.status(400).json({ message: 'Employee Group name already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }


    }
}

// Read EmployeeGroup
exports.readGroup = async (req, res) => {
    try {
        const employeeGroupId = req.params.id;
        const foundEmployeeGroup = await EmployeeGroup.findById(employeeGroupId).populate('members');
        if (!foundEmployeeGroup) {
            res.status(404).json({ message: 'Employee Group not found' });
            return;
        }
        res.status(200).json({ foundEmployeeGroup, message: 'success' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Update EmployeeGroup
exports.updateGroup = async (req, res) => {
    try {
        const employeeGroupId = req.params.id;
        const { name, description, members } = req.body;
        const updatedEmployeeGroup = await EmployeeGroup.findByIdAndUpdate(
            employeeGroupId,
            { name, description, members },
            { new: true }
        );
        if (!updatedEmployeeGroup) {
            res.status(404).json({ message: 'Employee Group not found' });
            return;
        }
        res.status(200).json({ employeeGroup: updatedEmployeeGroup, message: 'Employee group updated successfully' });
    } catch (error) {

        if (error.message.startsWith("Plan executor error during findAndModify")) {
            return res.status(400).json({ message: 'Employee Group name already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }

    }
}

// Update EmployeeGroupTask
exports.updateGroupTasks = async (req, res) => {
    try {
        const employeeGroupId = req.params.id;
        const { tasksCompleted: newTasksCompleted } = req.body;

        // Fetch the current EmployeeGroup document
        const currentEmployeeGroup = await EmployeeGroup.findById(employeeGroupId);

        if (!currentEmployeeGroup) {
            res.status(404).json({ message: 'Employee Group not found' });
            return;
        }

        // Add the newTasksCompleted to the existing tasksCompleted
        const updatedTasksCompleted = currentEmployeeGroup.tasksCompleted + newTasksCompleted;

        // Update the EmployeeGroup with the new tasksCompleted value
        const updatedEmployeeGroup = await EmployeeGroup.findByIdAndUpdate(
            employeeGroupId,
            { tasksCompleted: updatedTasksCompleted },
            { new: true }
        );

        res.status(200).json({ employeeGroup: updatedEmployeeGroup, message: 'Employee group updated successfully' });
    } catch (error) {

        if (error.message.startsWith("Plan executor error during findAndModify")) {
            return res.status(400).json({ message: 'Employee Group name already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }

    }
}

// Delete EmployeeGroup
exports.deleteGroup = async (req, res) => {
    try {
        const employeeGroupId = req.params.id;
        const deletedEmployeeGroup = await EmployeeGroup.findByIdAndDelete(employeeGroupId);
        if (!deletedEmployeeGroup) {
            res.status(404).json({ message: 'Employee Group not found' });
            return;
        }
        res.status(200).json({ message: 'Employee Group deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all EmployeeGroups
exports.allGroup = async (req, res) => {
    try {
        const allEmployeeGroups = await EmployeeGroup.find().populate('members');
        res.status(200).json({ allEmployeeGroups, message: 'success' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}