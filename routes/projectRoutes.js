var express = require("express");
var router = express.Router();
let controller = require("../controller");
var User = require("../models/user");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

router.use("/", express.static(path.join(__dirname, "public")));
router.use(bodyParser.json());

let rootDir = process.cwd(); // the root directory of the project on your local computer

router.get("");

router.get("/index", (req, res) => {
  let fileLocation = rootDir + "/public/index.html"; // creates absolute path for html file
  res.sendFile(fileLocation);
});
// this renders the history.html file on the /history route
// this will get all the user items to display on the page
router.get("/history", (req, res) => {
  //   controller.projectController.retrieveItems(req, res);
  let fileLocation = rootDir + "/public/history.html"; // creates absolute path for html file
  res.sendFile(fileLocation);
});

router.get("/images/:name", (req, res) => {
  controller.uploadController.downloadImages(req, res);
});

// this renders the location.html file on the /location route
router.get("/location", (req, res) => {
  let fileLocation = rootDir + "/public/location.html"; // creates absolute path for html file
  res.sendFile(fileLocation);
});

// this renders the chat.html file on the /chat route
router.get("/chat", (req, res) => {
  let fileLocation = rootDir + "/public/chat.html"; // creates absolute path for html file
  res.sendFile(fileLocation);
});

// this should save a new item to user history
// router.post("/history", (req, res) => {
//   controller.projectController.createItem(req, res);
// });

// this should delete an item from user history
// router.delete("/history", (req, res) => {
//   controller.projectController.deleteItem(req, res);
// });

//Create the API for suburbs

router.get("/api/suburbs", (req, res) => {
  controller.locationController.retrieveSuburbs(req, res);
});

//Uploads

router.get("/upload", (req, res) => {
  let fileLocation = rootDir + "/public/upload.html"; // creates absolute path for html file
  res.sendFile(fileLocation);
});

router.post("/upload", controller.uploadController.uploadFiles);

router.post("/prediction", (req, res) => {
  console.log("router prediction:" + req)
  controller.uploadController.predictionUpload(req, res)
});

module.exports = router;
