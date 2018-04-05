const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobTitle: { type: String, required: 'Job title is required.' },
  summary: { type: String, required: 'Include a summary of yourself.' },
  yearsExp: { type: Number, required: 'Include the number of years you have been practising.' },
  skills: {
    frontend: [{ type: String }],
    backend: [{ type: String }]
  },
  favouriteJobs: [{ type: mongoose.Schema.ObjectId, ref: 'Job' }],
  matchedJobs: [{ type: mongoose.Schema.ObjectId, ref: 'Job' }],
  cv: { type: String },
  user: { type: Boolean, default: true }
}, {
  timestamps: true
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswords(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
