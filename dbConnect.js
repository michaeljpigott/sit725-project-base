const MongoClient = require("mongodb").MongoClient; //connects MongoDb with the project



//const database =
const uri =
  "mongodb+srv://canurecycleit:SIT725@cluster0.oqdjdva.mongodb.net/?retryWrites=true&w=majority";

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
