const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;
const server = require('../src/app'); // Import the server

chai.use(chaiHttp);

let serverInstance;

describe('GET /', () => {
  before((done) => {
    // Check if the server is already running and stop it if necessary
    if (serverInstance) {
      serverInstance.close(() => {
        console.log('Previous test server stopped');
        startServer(done);
      });
    } else {
      startServer(done);
    }
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

function startServer(done) {
    serverInstance = server.listen(0, () => { // Porta 0 usa uma aleatória
      const { port } = serverInstance.address();
      console.log(`Test server running on http://localhost:${port}`);
      done();
    });
  }