const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  name: { type: String, required: 'You must provide a name'},
  logo: { type: String },
  info: { type: String, required: 'You must provide information'},
  photos: [{ type: String }],
  perks: [{ type: String }],
  listings: [{ type: mongoose.Schema.ObjectId, ref: 'Job'}],
  location: { type: String, required: 'You must provide a location'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Employer', employerSchema);
