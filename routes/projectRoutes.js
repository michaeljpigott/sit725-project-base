var express = require("express");
var router = express.Router();
let controller = require("../controller");

//post api

router.post("/", (req, res) => {
  controller.projectController.createProjects(req, res);
});

//Add get request to get data from the mongoDB database
router.get("/", (req, res) => {
  controller.projectController.retrieveProjects(req, res);
});

module.exports = router;
