var expect = require("chai").expect; //chai is an assertion library https://www.youtube.com/watch?v=sPyb6QlgBaU
var request = require("request");

describe("Add Two Numbers", function () {
  var url = "http://localhost:3000/addTwoNumbers/3/5";
  it("returns status 200 to check if api works", function (done) {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it("returns statusCode key in body to check if api give right result should be 200", function (done) {
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      expect(body.statusCode).to.equal(200);
      done();
    });
  });
  it("returns the result as number", function (done) {
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      expect(body.result).to.be.a("number");
      done();
    });
  });
  it("returns the result equal to 8", function (done) {
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      console.log(body.result);
      expect(body.result).to.equal(8);
      done();
    });
  });
  it("returns the result not equal to 15", function (done) {
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      expect(body.result).to.not.equal(15);
      done();
    });
  });
});

describe("Add Two strings", function () {
  var url = "http://localhost:3000/addTwoNumbers/a/b";
  it("should not return status 200", function (done) {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it("returns statusCode key in body to check if api gives right result should be 400", function (done) {
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      expect(body.statusCode).to.equal(400);
      done();
    });
  });
  it("returns the result as null", function (done) {
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      expect(body.result).to.be.a("null");
      done();
    });
  });
});

//create tests to test name API

describe("Name", function () {
  var url = "http://localhost:3000/name/michael/pigott";
  it("return status 200", function (done) {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it("capitalises the first letter of the first name", function (done) {
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      console.log(body.fullName);
      expect(body.fullName).to.equal("Michael Pigott");
      done();
    });
  });
});
