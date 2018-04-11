const Job = require('../models/job');
const Emailer = require('../lib/Emailer');

function indexRoute(req,res,next){
  Job.find()
    .populate('employer interestedUsers matchedUsers')
    .then(jobs => {
      console.log(jobs);
      res.json(jobs);
    })
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
    .populate('employer interestedUsers matchedUsers')
    .then(job => {
      console.log(job);
      res.json(job);
    })
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

function applyRoute(req, res, next) {
  const index = req.currentUser.matchedJobs.findIndex(jobId => jobId.equals(req.params.id));
  req.currentUser.matchedJobs.splice(index, 1);
  req.currentUser.save()
    .then(() => Job.findById(req.params.id).populate('employer'))
    .then(job => {
      return Emailer.sendMail({
        to: 'nicholaswilson3010@gmail.com',
        replyTo: req.currentUser.email,
        subject: 'Job Application',
        text: `Someone has applied for role of ${job.title}. Please review their CV at ${req.currentUser.cv}. Please contact them by replying to this email. `
      });
    })
    .then(info => console.log(info))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  apply: applyRoute
};
