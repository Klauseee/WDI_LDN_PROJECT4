/* global api, describe, it, expect, beforeEach */

const User = require('../../../models/user');
const userData = {
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test',
  jobTitle: 'ninja',
  summary: 'I am a code ninja',
  yearsExp: 5,
  technologies: {
    frontend: ['javascript', 'html', 'css'],
    backend: ['nodejs', 'mondgodb']
  }
};

describe('POST /users/register', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => done());
  });
  it('should return a message', done => {
    api
      .post('/api/users/register')
      .send(userData)
      .end((err, res) => {
        expect(res.body.message).to.eq('Thank you for registering');
        done();
      });
  });
  it('should return a token', done => {
    api
      .post('/api/users/register')
      .send(userData)
      .end((err, res) => {
        expect(res.body.token.split('.').length).to.eq(3);
        done();
      });
  });
  it('should return a 422 response if the passwords don\'t match', done => {
    const badData = Object.assign({}, userData, { password: 'bad'});
    api
      .post('/api/users/register')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
});
