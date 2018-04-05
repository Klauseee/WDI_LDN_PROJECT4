const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  jobTitle: { type: String, required: 'Job title is required.' },
  summary: { type: String, required: 'Include a summary of yourself.' },
  yearsExp: { type: Number, required: 'Include the number of years you have been practising.' },
  skills: {
    frontend: [{ type: String }],
    backend: [{ type: String }],
    database: [{ type: String }]
  },
  favouriteJobs: [{ type: mongoose.Schema.ObjectId, ref: 'Job' }],
  matchedJobs: [{ type: mongoose.Schema.ObjectId, ref: 'Job' }],
  cv: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
