const mongoose = require('mongoose');
const credentialPackageSchema = new mongoose.Schema({
    details: { type: String, required: true, unique: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, unique: true },
});
const CredentialPackage = mongoose.model('CredentialPackage', credentialPackageSchema);
module.exports = CredentialPackage;