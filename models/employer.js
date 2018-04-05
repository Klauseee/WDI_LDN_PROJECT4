const mongoose = require('mongoose');


const employerSchema = new mongoose.Schema({
  name: { type: String, required: 'You must provide a name'},
  Logo: { type: String },
  Info: { type: String, required: 'You must provide information'},
  photos: { type: Array },
  perks: { type: Array },
  listings: [{ type: mongoose.Schema.ObjectId, ref: 'Job'}],
  location: { type: String, required: 'You must provide a location'}
}, { timestamps: true });

module.exports = mongoose.model('Employer', employerSchema);
