var express = require("express");
var app = express();
var cors = require("cors");
const socketio = require("socket.io");
var port = process.env.port || 3000;
let client = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes");
let http = require("http").createServer(app);
const io = socketio(http);

var predictServer;
  io.on('connection', (socket) => {
    socket.on('prediction', (msg) => {
      //console.log('message: ' + msg);
      predictServer = msg; 
    });
  });

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(projectRoutes);
app.use("/api/suburbs", projectRoutes); /// might be an issue


http.listen(port, () => {
  console.log("App listening to http://localhost:"+port+'/upload')
});
