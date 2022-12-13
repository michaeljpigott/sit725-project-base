var express = require("express");
var router = express.Router();
let client = require("../dbConnect");
let projectsCollection;

setTimeout(() => {
  projectsCollection = client.db().collection("projects");
}, 2000);

router.post("/api/projects", (req, res) => {
  console.log("New Project added", req.body);
  var newProject = req.body;
  insertProjects(newProject, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({
        statusCode: 200,
        message: "Project Successfully added",
        data: result,
      });
    }
  });
});

//Add get request to get data from the mongoDB database
router.get("/api/projects", (req, res) => {
  getProjects((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, message: "Success", data: result });
    }
  });
});

// insert project...
const insertProjects = (project, callback) => {
  projectCollection.insert(project, callback);
};

// get project...
const getProjects = (callback) => {
  projectCollection.find({}).toArray(callback);
};

module.exports = router;
