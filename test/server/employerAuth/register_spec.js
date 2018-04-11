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

describe('POST /employers/register', () => {
  beforeEach(done => {
    Employer.remove({})
      .then(() => done());
  });
  it('should return a message', done => {
    api
      .post('/api/employers/register')
      .send(employerData)
      .end((err, res) => {
        expect(res.body.message).to.eq(`Thank you for registering ${employerData.name}`);
        done();
      });
  });
  it('should return a token', done => {
    api
      .post('/api/employers/register')
      .send(employerData)
      .end((err, res) => {
        expect(res.body.token.split('.').length).to.eq(3);
        done();
      });
  });
  it('should return a 422 response if the passwords don\'t match', done => {
    const badData = Object.assign({}, employerData, { password: 'bad'});
    api
      .post('/api/employers/register')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
});
