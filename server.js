var express = require("express");
const socketio = require("socket.io");
var port = process.env.port || 3000;
var ejs = require("ejs");
var path = require("path");
var app = express();

//variables for sockets
let http = require("http").createServer(app);
const io = socketio(http);

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

var cors = require("cors");
let client = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");
let historyRoutes = require("./routes/historyRoutes");

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(projectRoutes);
app.use("/api/history", historyRoutes);

app.use(express.json());

mongoose.connect(
  "mongodb+srv://canurecycleit:SIT725@cluster0.oqdjdva.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});

app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/views"));

var index = require("./routes/userRoutes");
app.use("/", index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("File Not Found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(port, () => {
  console.log("App listening to http://localhost:" + port);
});
