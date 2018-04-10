const User = require('../models/user');
const Emailer = require('../lib/Emailer');

function indexRoute(req,res,next){
  User.find()
    .populate('favoriteJobs matchedJobs')
    .then(users => res.json(users))
    .catch(next);
}

function createRoute(req,res,next){
  // req.body.admin = req.currentUser;
  User.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(next);
}

function showRoute(req, res, next) {
  User.findById(req.params.id)
    .populate('favoriteJobs')
    .populate({
      path: 'matchedJobs',
      populate: {
        path: 'employer',
        model: 'Employer'
      }
    })
    .then(user => res.json(user))
    .then(() => console.log(req.currentUser))
    .catch(next);
}

// function email(req, res, next) {
//   User.findById(req.params.id)
//     .then(() => console.log(req.body))
//     .catch(next);
// }

function updateRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  // email: email,
  update: updateRoute,
  delete: deleteRoute
};
