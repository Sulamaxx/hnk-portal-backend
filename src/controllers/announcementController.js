const User = require('../models/User');
const Announcement = require('../models/Announcement ');

// Create Announcement
exports.createAnnouncement = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Admin can access this section' });
        }
        const { title, content } = req.body;
        const author = req.cookies.userId;
        const newAnnouncement = new Announcement({ title, content, author });
        const savedAnnouncement = await newAnnouncement.save();
        res.status(201).json({ savedAnnouncement: savedAnnouncement, message: 'Announcement create successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Read Announcement
exports.readAnnouncement = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Admin can access this section' });
        }
        const announcementId = req.params.id;
        const foundAnnouncement = await Announcement.findById(announcementId).populate({
            path: 'author',
            select: 'first_name last_name role'
        });
        if (!foundAnnouncement) {
            res.status(404).json({ error: 'Announcement not found' });
            return;
        }
        res.status(200).json({ foundAnnouncement: foundAnnouncement, message: 'success' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update Announcement
exports.updateAnnouncement = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Admin can access this section' });
        }
        const announcementId = req.params.id;
        const { title, content, author } = req.body;
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            announcementId,
            { title, content, author },
            { new: true }
        ).populate({
            path: 'author',
            select: 'first_name last_name role'
        });
        if (!updatedAnnouncement) {
            res.status(404).json({ error: 'Announcement not found' });
            return;
        }
        res.status(200).json(updatedAnnouncement);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Delete Announcement
exports.deleteAnnouncement = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Admin can access this section' });
        }
        const announcementId = req.params.id;
        const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);
        if (!deletedAnnouncement) {
            res.status(404).json({ error: 'Announcement not found' });
            return;
        }
        res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Get all Announcements
exports.allAnnouncement = async (req, res) => {
    try {
        if (!(req.user.role === 'admin' || req.user.role === 'employee')) {
            return res.status(403).json({ message: 'Permission denied. Admin and employee can access this section' });
        }
        const allAnnouncements = await Announcement.find().populate({
            path: 'author',
            select: 'first_name last_name role'
        });
        res.status(200).json({ allAnnouncements: allAnnouncements, message: 'success' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

