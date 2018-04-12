/* global api, describe, it, expect, beforeEach */

const Job = require('../../../models/job');
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

let jobId;

describe('GET /jobs/:id', ()=> {
  beforeEach(done => {
    Job.remove({})
      .then(() => Job.create(jobData))
      .then(job => {
        jobId = job._id;
        // console.log(job._id);
      })
      .then(() => done());
  });
  it('should return a 200 response', done => {
    api
      .get(`/api/jobs/${jobId}`)
      .send(jobData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return a valid bathroom object', done => {
    api
      .get(`/api/jobs/${jobId}`)
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
