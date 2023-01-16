let mongo = require("mongodb");
let client = require("../dbConnect");

// connects to database collection called Melb_City_Councils (ie a database with Melbourne suburbs and their LGAs)
setTimeout(() => {
  melbSuburbs = client.db().collection("Melb_City_Councils");
}, 2000);



// this will create an array with the information about Melbourne suburbs and LGAs
const melbData = (callback) => {
  melbSuburbs.find({}).toArray(callback);
};

module.exports = { melbData };
