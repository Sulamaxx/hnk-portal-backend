const mongoose = require('mongoose');

const clientPreferencesSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  arrangement: { type: String, required: true }, // Adjust the type based on your preferences data type
  createdAt: { type: Date, default: Date.now },
  // Add other preferences details as needed
});

const ClientPreferences = mongoose.model('ClientPreferences', clientPreferencesSchema);

module.exports = ClientPreferences;
