let mongo = require("mongodb");
let client = require("../dbConnect");
const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");


let projectCollection;


// connects to database collection called Items (ie user's history of uploaded items)
setTimeout(() => {
  projectCollection = client.db().collection("Uploads");
}, 2000);

var storage = new GridFsStorage({
  url:"mongodb+srv://canurecycleit:SIT725@cluster0.oqdjdva.mongodb.net/?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-canUrecycleit-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-canUrecycleit-${file.originalname}`,
      //metadata: document.getElementById("prediction-list").innerText
    };
  }
});

var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;

