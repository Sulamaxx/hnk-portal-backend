const express = require('express');
const biographyController = require('../../controllers/biographyController');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();
// add
router.post('/biographys', authMiddleware, biographyController.createBiography);
// get
router.get('/biographys', authMiddleware, biographyController.readBiography);
// update
router.put('/biographys', authMiddleware, biographyController.updateBiography);
// delete
router.delete('/biographys', authMiddleware, biographyController.deleteBiography);
module.exports = router;
