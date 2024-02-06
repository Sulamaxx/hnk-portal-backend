const express = require('express');
const credentialPackageController = require('../../controllers/credentialPackageController');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();
// add
router.post('/credentials', authMiddleware, credentialPackageController.createCredentialPackage);
// get
router.get('/credentials', authMiddleware, credentialPackageController.readCredentialPackage);
// update
router.put('/credentials', authMiddleware, credentialPackageController.updateCredentialPackage);
// detele
router.delete('/credentials', authMiddleware, credentialPackageController.deleteCredentialPackage);
module.exports = router;