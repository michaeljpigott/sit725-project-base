//the model part of MVC deals with the data, therefore the functions on this file insert new data into the database and retrieve existing data

let mongo = require("mongodb");
let client = require("../dbConnect");
let projectCollection;

setTimeout(() => {
  projectCollection = client.db().collection("cars");
}, 2000);

// insert project...
const insertProjects = (project, callback) => {
  projectCollection.insert(project, callback);
};

// get project...
const getProjects = (callback) => {
  projectCollection.find({}).toArray(callback);
};

module.exports = {
  insertProjects,
  getProjects,
};
