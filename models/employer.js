const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: 'You must provide a name'},
  logo: { type: String },
  info: { type: String, required: 'You must provide information'},
  photos: [{ type: String }],
  perks: [{ type: String }],
  listings: [{ type: mongoose.Schema.ObjectId, ref: 'Job'}],
  location: { type: String, required: 'You must provide a location'},
  employer: { type: Boolean, default: true }
}, { timestamps: true });

employerSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

employerSchema.pre('validate', function checkPasswords(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

employerSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

employerSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Employer', employerSchema);
