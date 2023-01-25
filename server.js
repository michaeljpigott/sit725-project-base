var express = require("express");
var app = express();
var cors = require("cors");
var port = process.env.port || 3000;
let client = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(projectRoutes);
app.use("/api/suburbs", projectRoutes); /// might be an issue

const mongoose = require('mongoose')
const User = require('./models/user')

mongoose.connect('mongodb+srv://canurecycleit:SIT725@cluster0.oqdjdva.mongodb.net/?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

app.listen(port, () => {
  console.log("App listening to http://localhost:"+port)
});
