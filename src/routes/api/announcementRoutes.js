const express = require('express');
const announcementController = require('../../controllers/announcementController');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();
// add
router.post('/announcements', authMiddleware, announcementController.createAnnouncement);
// get all
router.get('/announcements', authMiddleware, announcementController.allAnnouncement);
// get by id
router.get('/announcements/:id', authMiddleware, announcementController.readAnnouncement);
// update by id
router.put('/announcements/:id', authMiddleware, announcementController.updateAnnouncement);
// delete by id
router.delete('/announcements/:id', authMiddleware, announcementController.deleteAnnouncement);
module.exports = router;
