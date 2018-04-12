const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Employer = require('../models/employer');
const User = require('../models/user');
const Job = require('../models/job');
const employerData = require('./data/employers');
const userData = require('./data/users');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  User.create(userData)
    .then(users => console.log(`${users.length} users created!`))
    .then(() => Employer.create(employerData))
    .then(employers => console.log(`${employers.length} employers created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
  Employer.create({
    email: 'uber@uber.com',
    password: 'password',
    passwordConfirmation: 'password',
    name: 'Uber',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW4I8b3SqZi34Bab_MENHFGZRE9W8mW2oiXvNeqCuXnjzVvqILJQ',
    info: 'The roads are ours',
    photos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSddprkToAlTVTbstJIRvwE2drVesjMNBTM8Ylk3zkHjh7zNdQEJQ'],
    perks: ['Free food and drinks', 'Your soul belongs to us'],
    location: 'Aldgate Tower, 2 Leman St, London E1 8FA'
  })
    .then(employer => Job.create([{
      title: 'CEO',
      location: 'London',
      type: 'permanent',
      technologies: {
        primary: ['javascript', 'html', 'css', 'react'],
        secondary: ['nodejs', 'rails']
      },
      summary: 'Be the boss',
      salary: 5000000,
      employer: employer
    }]))
    .then(jobs => console.log(`${jobs.length} jobs created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
