const router = require('express').Router();
// const secureRoute = require('../lib/secureRoute');
const jobs = require('../controllers/jobs');
const users = require('../controllers/users');
const employers = require('../controllers/employers');
// const auth = require('../controllers/auth');

// JOB ROUTES
router.route('/jobs')
  .get(jobs.index)
  // .post(jobs.create);

router.route('/jobs/:id')
  .get(jobs.show)
  .put(jobs.update)
  .delete(jobs.delete);

// USER ROUTES
router.route('/users')
  .get(users.index)
  // .post(users.create);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

// EMPLOYER ROUTES
router.route('/employers')
  .get(employers.index)
  // .post(employers.create);

router.route('/employers/:id')
  .get(employers.show)
  .put(employers.update)
  .delete(employers.delete);

// router.route('/register')
//   .post(auth.register);

// router.route('/login')
//   .post(auth.login);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
