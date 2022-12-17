require("dotenv").config();
const MongoClient = require("mongodb").MongoClient; //connects MongoDb with the project

//add database connection

const uri =
  "mongodb+srv://mpigott:Tue29112022@cluster0.5vufhgp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect((err, db) => {
  if (!err) {
    console.log("MongoDB Connected");
  } else {
    console.log("DB Error: ", err);
    process.exit(1);
  }
});

module.exports = client;
