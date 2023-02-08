var expect = require("chai").expect; //chai is an assertion library https://www.youtube.com/watch?v=sPyb6QlgBaU
var request = require("request");

const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const http = require('../server.js');

const should = chai.should();

chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(http);

const User = require('../models/user');

//Tests for location feature
describe("Location page", function () {
  var url = "http://localhost:3000/location";
  it("returns status 200 to check if location page works", function (done) {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
describe("Suburbs API", function () {
  var url = "http://localhost:3000/api/suburbs";
  it("returns status 200 to check if location page works", function (done) {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe("History page", () => {
  const url = "http://localhost:3000/history";
  it("returns status 200 to check if history page works", (done) => {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe("Get history images", () => {
  const url = "http://localhost:3000/api/history";
  it("returns an array of image objects", (done) => {
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      expect(body.data[0])
        .to.be.an("object")
        .that.does.have.all.keys("id", "name", "url", "date", "prediction");
      done();
    });
  });
});

// Check User Dashboard Loads correctly 

describe("User Dashboard", function () {
  var url = 'http://localhost:3000/profile';
  // first it function....
  it("returns status 200 to check if page works", function (done) {
      request(url, function (error, response) {
          expect(response.statusCode).to.equal(200);
          done();
      });
  });
});

// test authentication 

describe('User', function () {
    it('should not be able to login if they have not registered', function (done) {
        agent.post('/login', { email: 'wrong@example.com', password: 'nope' }).end(function (err, res) {
          res.should.have.status(200);
          done();
        });
      });
});

