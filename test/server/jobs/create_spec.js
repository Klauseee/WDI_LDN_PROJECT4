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

describe('POST /jobs', () => {
  beforeEach(done => {
    Promise.all([
      Employer.remove({}),
      Job.remove({})
    ])
      .then(() => Employer.create(employerData))
      .then(employer => {
        token = jwt.sign({ sub: employer._id }, secret, { expiresIn: '6h' });
      })
      .then(() => done());
  });
  it('should return a 401 response without a token', done => {
    api
      .post('/api/jobs')
      .send(jobData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 201 response with a token', done => {
    api
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send(jobData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('should return a valid bathroom object', done => {
    api
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send(jobData)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string');
        expect(res.body.title).to.eq(jobData.title);
        expect(res.body.location).to.eq(jobData.location);
        expect(res.body.type).to.eq(jobData.type);
        expect(res.body.summary).to.eq(jobData.summary);
        expect(res.body.salary).to.eq(jobData.salary);
        expect(res.body.technologies.primary).to.deep.eq(jobData.technologies.primary);
        expect(res.body.technologies.secondary).to.deep.eq(jobData.technologies.secondary);
        done();
      });
  });
});
