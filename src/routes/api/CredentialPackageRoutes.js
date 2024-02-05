const express = require('express');

const credentialPackageController = require('../../controllers/credentialPackageController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();


router.post('/credentials', authMiddleware, credentialPackageController.createCredentialPackage);
router.get('/credentials', authMiddleware, credentialPackageController.readCredentialPackage);
router.put('/credentials', authMiddleware, credentialPackageController.updateCredentialPackage);
router.delete('/credentials', authMiddleware, credentialPackageController.deleteCredentialPackage);

module.exports = router;