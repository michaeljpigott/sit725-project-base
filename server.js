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

const cardList = [
  {
    title: "Lamborghini",
    image: "/images/lamborghini.jpg",
    link: `<a href="https://unsplash.com/photos/X16zXcbxU4U?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">About this Lamborghini photo</a>`,
    desciption: `Photo by <a href="https://unsplash.com/@dhivakrishna?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dhiva Krishna</a> on <a href="https://unsplash.com/s/photos/car?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    `,
  },
  {
    title: "Tesla",
    image: "/images/tesla.jpg",
    link: `<a href="https://unsplash.com/photos/kPUQOsfThag?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">About this Tesla photo</a>`,
    desciption: `Photo by <a href="https://unsplash.com/@technick_inc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tech Nick</a> on <a href="https://unsplash.com/s/photos/tesla?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    `,
  },
];

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

var port = process.env.port || 3000;

app.listen(port, () => {
  console.log("App listening to: " + port);
  createColllection("cars");
});
