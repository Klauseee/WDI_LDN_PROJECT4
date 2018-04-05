const Employer = require('../models/employer');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next){
  Employer.create(req.body)
    .then(employer => {
      const token = jwt.sign({ sub: employer._id}, secret, {expiresIn: '6h'});
      res.json({
        message: `Thank you for registering ${employer.name}`,
        token
      });
    })
    .catch(next);
}

function login(req, res, next){
  Employer.findOne({ email: req.body.email })
    .then(employer => {
      if(!employer || !employer.validatePassword(req.body.password)){
        return res.status(401).json({ message: 'Unauthorised' });
      }
      const token = jwt.sign({ sub: employer._id}, secret, {expiresIn: '6h'});
      res.json({
        message: `Welcome back ${employer.name}`,
        token
      });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
