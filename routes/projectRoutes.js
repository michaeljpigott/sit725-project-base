var express = require("express");
var router = express.Router();
let controller = require("../controller");
let rootDir = process.cwd(); // the root directory of the project on your local computer

router.get("");
// this renders the history.html file on the /history route
// this will get all the user items to display on the page
router.get("/history", (req, res) => {
  //   controller.projectController.retrieveItems(req, res);
  let fileLocation = rootDir + "/public/history.html"; // creates absolute path for html file
  res.sendFile(fileLocation);
});

// this renders the location.html file on the /location route
router.get("/location", (req, res) => {
  let fileLocation = rootDir + "/public/location.html"; // creates absolute path for html file
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

router.get("/", (req, res) => {
  controller.locationController.retrieveSuburbs(req, res);
});

module.exports = router;
