/* global api, describe, it, expect, beforeEach */

const Employer = require('../../../models/employer');
const Job = require('../../../models/job');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
const employerData = {
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test',
  name: 'Google',
  info: 'Gods of Google',
  location: 'London'
};
const jobData = {
  title: 'CEO',
  location: 'London',
  type: 'permanent',
  technologies: {
    primary: ['javascript', 'nodejs'],
    secondary: ['html', 'angularjs']
  },
  summary: 'test summary',
  salary: 120000
};

let token;
let jobId;

describe('DELETE /jobs/:id', () => {
  beforeEach(done => {
    Promise.all([
      Employer.remove({}),
      Job.remove({})
    ])
      .then(() => Employer.create(employerData))
      .then(employer => {
        token = jwt.sign({ sub: employer._id }, secret, { expiresIn: '6h' });
      })
      .then(() => Job.create(jobData))
      .then(job => {
        jobId = job._id;
      })
      .then(() => done());
  });
  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/jobs/${jobId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(jobData)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
  it('should return a 401 response without a token', done => {
    api
      .delete(`/api/jobs/${jobId}`)
      .send(jobData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
});
