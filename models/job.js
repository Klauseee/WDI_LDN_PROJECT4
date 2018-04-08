const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employer: { type: mongoose.Schema.ObjectId, ref: 'Employer' },
  title: { type: String, required: 'You must provide a job title' },
  location: { type: String, required: 'You must provide a location' },
  type: { type: String, enum: ['permanent', 'contract'], required: 'You must provide a job type' },
  technologies: {
    primary: [{ type: String }],
    secondary: [{ type: String }]
  },
  summary: { type: String },
  interestedUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  salary: { type: Number, required: 'You must provide a motherfucking salary!'}
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
