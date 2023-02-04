let mongo = require("mongodb");
let client = require("../dbConnect");

// connects to database collection called Melb_City_Councils (ie a database with Melbourne suburbs and their LGAs)
setTimeout(() => {
  melbSuburbs = client.db("CanURecycleIt").collection("suburbs");
}, 2000);

// this will create an array with the information about Melbourne suburbs and LGAs
const melbData = (callback) => {
  melbSuburbs.find({}).toArray(callback);
};

// connect to the database collection of users
setTimeout(() => {
  usersList = client.db("CanURecycleIt").collection("users");
}, 2000);

//create a variable to export

const usersData = (callback) => {
  usersList.find({}).toArray(callback);
};

module.exports = { melbData, usersData };
