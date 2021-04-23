const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Server', () => {
  describe('/', () => {
    it('gets status 200', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('/api/10', () => {
    it('gets medians', (done) => {
      chai.request(server)
        .get('/api/10')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.median).to.be.an('array');
          expect(res.body.median).to.deep.equal([3,5]);
          done();
        });
    });
  });

  describe('/api/18', () => {
    it('gets medians', (done) => {
      chai.request(server)
        .get('/api/18')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.median).to.be.an('array');
          expect(res.body.median).to.deep.equal([7]);
          done();
        });
    });
  });

  describe('Over limit', () => {
    it('returns error', (done) => {
      chai.request(server)
        .get('/api/100000000')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.error).to.be.an('object');
          expect(res.body.error).to.have.property('message');
          done();
        });
    });
  });

  describe('Unkown route', () => {
    it('returns 404', (done) => {
      chai.request(server)
        .get('/bad')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});