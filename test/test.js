var expect = require("chai").expect; //chai is an assertion library https://www.youtube.com/watch?v=sPyb6QlgBaU
var request = require("request");

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
