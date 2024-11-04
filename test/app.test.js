const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;
const server = require('../src/app'); // Import the server

chai.use(chaiHttp);

let serverInstance;

describe('GET /', () => {
  before((done) => {
    serverInstance = server.listen(3000, () => {
      console.log('Test server running on http://localhost:3000');
      done();
    });
  });

  after((done) => {
    serverInstance.close(() => {
      console.log('Test server stopped');
      done();
    });
  });

  it('should return welcome message', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome to the Urban Mobility Platform!');
        done();
      });
  });
});