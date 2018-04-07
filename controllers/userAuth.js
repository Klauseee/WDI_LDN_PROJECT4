const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next){
  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id, role: 'users' }, secret, {expiresIn: '6h'});
      res.json({
        message: 'Thank you for registering',
        token
      });
    })
    .catch(next);
}

function login(req, res, next){
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log(user);
      if(!user || !user.validatePassword(req.body.password)){
        return res.status(401).json({ message: 'Unauthorised' });
      }
      const token = jwt.sign({ sub: user._id, role: 'users' }, secret, {expiresIn: '6h'});
      res.json({
        message: 'Welcome back',
        token
      });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
