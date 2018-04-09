const Employer = require('../models/employer');

function indexRoute(req,res,next){
  Employer.find()
    .then(users => res.json(users))
    .catch(next);
}

function createRoute(req,res,next){
  // req.body.admin = req.currentUser;
  Employer.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
}

function showRoute(req, res, next) {
  Employer.findById(req.params.id)
    .populate('listings')
    .then(user => res.json(user))
    .then(() => console.log(req.currentUser))
    .catch(next);
}

function updateRoute(req, res, next) {
  Employer.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Employer.findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
