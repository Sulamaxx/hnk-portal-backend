const express = require('express');
const announcementController = require('../../controllers/announcementController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();


router.post('/announcements', authMiddleware, announcementController.createAnnouncement);
router.get('/announcements', authMiddleware, announcementController.allAnnouncement);
router.get('/announcements/:id', authMiddleware, announcementController.readAnnouncement);
router.put('/announcements/:id', authMiddleware, announcementController.updateAnnouncement);
router.delete('/announcements/:id', authMiddleware, announcementController.deleteAnnouncement);

module.exports = router;
