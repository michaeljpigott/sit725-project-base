var express = require("express");
var router = express.Router();
let controller = require("../controller");

router.get("/", (req, res) => {
  controller.uploadController.getListFiles(req, res);
});

module.exports = router;
