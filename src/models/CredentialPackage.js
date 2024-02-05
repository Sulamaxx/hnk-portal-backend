const mongoose = require('mongoose');

const credentialPackageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Other credential package details
});

const CredentialPackage = mongoose.model('CredentialPackage', credentialPackageSchema);

module.exports = CredentialPackage;