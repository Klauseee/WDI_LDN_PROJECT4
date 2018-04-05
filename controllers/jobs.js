const Job = require('../models/job');

function indexRoute(req,res,next){
  Job.find()
    .then(users => res.json(users))
    .catch(next);
}

function createRoute(req,res,next){
  // req.body.admin = req.currentUser;
  Job.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(next);
}

function showRoute(req, res, next) {
  Job.findById(req.params.id)
    .then(user => res.json(user))
    .then(() => console.log(req.currentUser))
    .catch(next);
}

function updateRoute(req, res, next) {
  Job.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Job.findById(req.params.id)
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
