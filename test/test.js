var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;

chai.use(chaiHttp);

describe('url shortener microservice', () => {
  describe('/new/:url', () => {
    var long_url = 'https://www.google.com';
    var short_url = 'https://little-url.herokuapp.com/389lo';
    var path = '/little-url/new/' + long_url;

    it('should respond with status 200', (done) => {
      chai.request(server)
      .get(path)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      })
    })

    it('should return shortened url', (done) => {
      chai.request(server)
      .get(path)
      .end((err, res) => {
        expect(JSON.parse(res.text).original_url).to.equal(long_url);
        expect(JSON.parse(res.text).short_url).to.equal(short_url);
        done();
      })
    })
  })
})