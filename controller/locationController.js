let locationModel = require("../models/locationModel");

//insert data into 

//this will get all items from the database about Melbourne suburbs

const retrieveSuburbs = (req, res) => {
  locationModel.melbData((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, message: "success", data: result });
    }
  });
};

module.exports = { retrieveSuburbs };
