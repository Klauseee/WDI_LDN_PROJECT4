/* global api, describe, it, expect, beforeEach */

const Job = require('../../../models/job');
const jobData = [{
  title: 'CEO',
  location: 'London',
  type: 'permanent',
  technologies: {
    primary: ['javascript', 'nodejs'],
    secondary: ['html', 'angularjs']
  },
  summary: 'test summary',
  salary: 120000
}, {
  title: 'Janitor',
  location: 'Manchester',
  type: 'contract',
  technologies: {
    primary: ['react', 'krakenjs'],
    secondary: ['mongodb', 'wordpress']
  },
  summary: 'second test summary',
  salary: 12000
}];

describe('GET /jobs', () => {
  beforeEach(done => {
    Job.remove({})
      .then(() => Job.create(jobData))
      .then(() => done());
  });
  it('should return a 200 response', done => {
    api
      .get('/api/jobs')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return an array as response body', done => {
    api
      .get('/api/jobs')
      .send(jobData)
      .end((err, res) => {
        expect(res.body).to.be.a('array');
        done();
      });
  });
  it('should return an array of valid job objects', done => {
    api
      .get('/api/jobs')
      .send(jobData)
      .end((err, res) => {
        res.body.forEach((job, index) => {
          expect(job.title).to.eq(jobData[index].title);
          expect(job.location).to.eq(jobData[index].location);
          expect(job.type).to.eq(jobData[index].type);
          expect(job.summary).to.eq(jobData[index].summary);
          expect(job.salary).to.eq(jobData[index].salary);
          expect(job.technologies.primary).to.deep.eq(jobData[index].technologies.primary);
          expect(job.technologies.secondary).to.deep.eq(jobData[index].technologies.secondary);
        });
        done();
      });
  });
});
