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
