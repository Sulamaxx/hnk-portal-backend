const express = require('express');
const biographyController = require('../../controllers/biographyController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/biographys', authMiddleware, biographyController.createBiography);
router.get('/biographys', authMiddleware, biographyController.readBiography);
router.put('/biographys', authMiddleware, biographyController.updateBiography);
router.delete('/biographys', authMiddleware, biographyController.deleteBiography);

module.exports = router;
