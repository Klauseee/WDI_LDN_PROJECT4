const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const User = require('../models/user');
const Employer = require('../models/employer');
const { secret } = require('../config/environment');

function secureRoute(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).json({ message: 'Unauthorised'});
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if(err) return reject(err);
      resolve(payload);
    });
  })
    .then(payload => {
      return Promise.props({
        user: User.findById(payload.sub),
        employer: Employer.findById(payload.sub)
      });
    })
    .then(data => {
      if(!data.user && !data.employer) return res.status(401).json({ message: 'Unauthorised'});
      req.currentUser = data.user || data.employer;
      next();
    })
    .catch(() => res.status(401).json({ message: 'Unauthorised'}));
}

module.exports = secureRoute;
