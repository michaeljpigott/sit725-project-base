var express = require("express");
var app = express();
var cors = require("cors");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const MongoClient = require("mongodb").MongoClient; //connects MongoDb with the project

//add database connection

const uri =
  "mongodb+srv://mpigott:Tue29112022@cluster0.5vufhgp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

//create collection function
const createColllection = (collectionName) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection(collectionName); //variable project collection
    if (!err) {
      console.log("MongoDB Connected");
    } else {
      console.log("DB Error: ", err);
      process.exit(1);
    }
  });
};

app.post("/api/projects", (req, res) => {
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

// insert project...
const insertProjects = (project, callback) => {
  projectCollection.insert(project, callback);
};

//Add get request to get data from the mongoDB database
app.get("/api/projects", (req, res) => {
  getProjects((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, message: "Success", data: result });
    }
  });
});

// get project...
const getProjects = (callback) => {
  projectCollection.find({}).toArray(callback);
};

var port = process.env.port || 3000;

app.listen(port, () => {
  console.log("App listening to: " + port);
  createColllection("cars");
});
