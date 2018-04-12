/* global api, describe, it, expect, beforeEach */

const Employer = require('../../../models/employer');
const employerData = {
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test',
  name: 'Google',
  info: 'Gods of Google',
  location: 'London'
};

describe('POST /employers/login', () => {
  beforeEach(done => {
    Employer.remove({})
      .then(() => Employer.create(employerData))
      .then(() => done());
  });
  it('should return a token', done => {
    api
      .post('/api/employers/login')
      .send(employerData)
      .end((err, res) => {
        expect(res.body.token.split('.').length).to.eq(3); // checks that the token is in three parts seperated by a period
        done();
      });
  });
  it('should return a 401 response if the password is bad', done => {
    const badData = { email: 'test@test.com', password: 'bad' };
    api
      .post('/api/employers/login')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 401 response if the employer doesn\'t exist', done => {
    const badData = { email: 'bad@test.com', password: 'test' };
    api
      .post('/api/employers/login')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
});
