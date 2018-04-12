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
const updatedJobData = {
  title: 'CEOEOEOEOEO',
  location: 'London',
  type: 'permanent',
  technologies: {
    primary: ['javascript', 'nodejs'],
    secondary: ['html', 'angularjs']
  },
  summary: 'test summary',
  salary: 1200000
};

let token;
let jobId;

describe('PUT /jobs/:id', () => {
  beforeEach(done => {
    Promise.all([
      Employer.remove({}),
      Job.remove({})
    ])
      .then(() => Employer.create(employerData))
      .then(employer => {
        token = jwt.sign({ sub: employer._id }, secret, { expiresIn: '6h' });//.sign is a jwt method that creates the token
      })
      .then(() => Job.create(jobData))
      .then(bathroom => {
        jobId = bathroom._id;

      })
      .then(() => done());
  });

  it('should have changed the data', done => {
    api
      .put(`/api/jobs/${jobId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedJobData)
      .end((err, res) => {
        expect(res.body.title).to.eq('CEOEOEOEOEO');
        expect(res.body.salary).to.eq(1200000);
        done();
      });
  });
  // it('should return a 200 response with a token', done => {
  //   api
  //     .put(`/api/jobs/${jobId}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(updatedJobData)
  //     .end((err, res) => {
  //       expect(res.status).to.eq(200);
  //       done();
  //     });
  // });
  // it('should return a 401 response without a token', done => {
  //   api
  //     .put(`/api/jobs/${jobId}`)
  //     .send(updatedJobData)
  //     .end((err, res) => {
  //       expect(res.status).to.eq(401);
  //       done();
  //     });
  // });
});
