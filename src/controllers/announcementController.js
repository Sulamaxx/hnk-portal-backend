const User = require('../models/User');
const Announcement = require('../models/Announcement ');

// Create Announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newAnnouncement = new Announcement({ title, content, author });
        const savedAnnouncement = await newAnnouncement.save();
        res.status(201).json(savedAnnouncement);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Read Announcement
exports.readAnnouncement = async (req, res) => {
    try {
        const announcementId = req.params.id;
        const foundAnnouncement = await Announcement.findById(announcementId).populate('author', 'username');
        if (!foundAnnouncement) {
            res.status(404).json({ error: 'Announcement not found' });
            return;
        }
        res.status(200).json(foundAnnouncement);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update Announcement
exports.updateAnnouncement = async (req, res) => {
    try {
        const announcementId = req.params.id;
        const { title, content, author } = req.body;
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            announcementId,
            { title, content, author },
            { new: true }
        ).populate('author', 'username');
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
        const allAnnouncements = await Announcement.find().populate('author', 'username');
        res.status(200).json(allAnnouncements);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
