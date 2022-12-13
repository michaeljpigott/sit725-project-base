var express = require("express");
var app = express();
var cors = require("cors");
let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/projects", projectRoutes);

//create collection function
/*const createColllection = (collectionName) => {
  client.connect((err, db) => {
    projectCollection = client.db().collection(collectionName); //variable project collection
    /*if (!err) {
      console.log("MongoDB Connected");
    } else {
      console.log("DB Error: ", err);
      process.exit(1);
    }
  });
};*/

var port = process.env.port || 3000;

app.listen(port, () => {
  console.log("App listening to: " + port);
  //createColllection("cars");
});
