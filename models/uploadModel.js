let mongo = require("mongodb");
let client = require("../dbConnect");
const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { FlipLeftRight } = require("@tensorflow/tfjs");
//let predictServer = require("../server");

//console.log(predictServer);
// connects to database collection called Items (ie user's history of uploaded items)
setTimeout(() => {
  projectCollection = client.db().collection("Uploads");
}, 2000);

let data; 

var predictionModel = (project) => {
  data = project.Material
  return data
  }

var storage = new GridFsStorage({
  url:"mongodb+srv://canurecycleit:SIT725@cluster0.oqdjdva.mongodb.net/?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    //console.log(predictServer);

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-canUrecycleit-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-canUrecycleit-${file.originalname}`,
      metadata: `${data}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = {uploadFilesMiddleware, predictionModel};

