const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const expect = chai.expect;
const server = require('../src/app'); // Import the server

chai.use(chaiHttp);

let serverInstance;

describe('GET /', function () {
  this.timeout(5000); // Define um timeout para garantir que o teste finalize em até 5 segundos

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
    if (serverInstance) {
      serverInstance.close(() => {
        console.log('Test server stopped');
        done();
      });
    } else {
      done();
    }
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

// Garante que o processo encerre após a execução dos testes
after(() => {
  if (serverInstance) {
    serverInstance.close(() => {
      console.log('Final server shutdown');
      process.exit(0); // Força o término do processo Node.js
    });
  }
});
