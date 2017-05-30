var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;

chai.use(chaiHttp);

describe('request header parser microservice', () => {
  describe('/api/whoami', () => {
    it('should respond with status 200', (done) => {
      chai.request(server)
      .get('/api/whoami')
      .set('user-agent', 'Mozilla/5.0 (X11; Linux x86_64)') 
      .set('accept-language', 'en-US')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      })
    })

    it('should return ip address', (done) => {
      chai.request(server)
      .get('/api/whoami')
      .set('user-agent', 'Mozilla/5.0 (X11; Linux x86_64)') 
      .set('accept-language', 'en-US')
      .end((err, res) => {
        expect(JSON.parse(res.text).ipaddress).to.equal("127.0.0.1");
        done();
      })
    })

    it('should return language', (done) => {
      chai.request(server)
      .get('/api/whoami')
      .set('user-agent', 'Mozilla/5.0 (X11; Linux x86_64)') 
      .set('accept-language', 'en-US')
      .end((err, res) => {
        expect(JSON.parse(res.text).language).to.equal("en-US");
        done();
      })
    })

    it('should return OS', (done) => {
      chai.request(server)
      .get('/api/whoami')
      .set('user-agent', 'Mozilla/5.0 (X11; Linux x86_64)') 
      .set('accept-language', 'en-US')
      .end((err, res) => {
        expect(JSON.parse(res.text).software).to.equal("Linux 64");
        done();
      })
    })
  })
})