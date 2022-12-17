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
app.use("/api/projects", projectRoutes);

//api for testing

app.get("/addTwoNumbers/:firstNumber/:secondNumber", function (req, res, next) {
  var firstNumber = parseInt(req.params.firstNumber);
  var secondNumber = parseInt(req.params.secondNumber);
  var result = firstNumber + secondNumber || null;
  if (result == null) {
    res.json({ result: result, statusCode: 400 }).status(400);
  } else {
    res.json({ result: result, statusCode: 200 }).status(200);
  }
});



app.listen(port, () => {
  console.log("App listening to: " + port);
});
