const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Employer = require('../models/employer');
const User = require('../models/user');
// const Job = require('../models/job');
const employerData = require('./data/employers');
const userData = require('./data/users');
// const jobData = require('./data/jobs');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  User.create(userData)
    .then(users => console.log(`${users.length} users created!`))
    .then(() => Employer.create(employerData))
    .then(employers => console.log(`${employers.length} employers created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
