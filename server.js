var express = require("express");
var app = express();
var cors = require("cors");
var port = process.env.port || 3000;
let client = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");
let io = require("socket.io")(http); //connect the socket.io library to the app

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/projects", projectRoutes);

//listener to look out for when a user connects to the socket
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});

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

app.get("/name/:firstName/:surname", function (req, res, next) {
  // change first letter of surname to uppercase. Source info is from here: https://flexiple.com/javascript/javascript-capitalize-first-letter/
  firstName =
    req.params.firstName.charAt(0).toUpperCase() +
    req.params.firstName.slice(1);
  surname =
    req.params.surname.charAt(0).toUpperCase() + req.params.surname.slice(1);
  let fullName = firstName + " " + surname || null;
  if (fullName == null) {
    res.json({ fullName: fullName, statusCode: 400 }).status(400);
  } else {
    res.json({ fullName: fullName, statusCode: 200 }).status(200);
  }
});

app.listen(port, () => {
  console.log("App listening to: " + port);
});
