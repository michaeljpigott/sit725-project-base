var express = require("express");
var router = express.Router();
let controller = require("../controller");

router.get("/", (req, res) => {
  controller.uploadController.getListFiles(req, res);
});

router.delete("/", (req, res) => {
  controller.uploadController.deleteImage(req, res);
});

module.exports = router;
