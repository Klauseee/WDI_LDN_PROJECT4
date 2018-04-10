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
  // interestedUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  // matchedUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  salary: { type: Number, required: 'You must provide a motherfucking salary!'}
}, { timestamps: true });

jobSchema.virtual('interestedUsers', {
  localField: '_id',
  foreignField: 'favoriteJobs',
  ref: 'User'
});

jobSchema.virtual('matchedUsers', {
  localField: '_id',
  foreignField: 'matchedJobs',
  ref: 'User'
});

jobSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Job', jobSchema);
