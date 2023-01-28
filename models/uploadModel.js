let mongo = require("mongodb");
let client = require("../dbConnect");
const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const GridFSBucket = require("mongodb").GridFSBucket;
let projectCollection;

// connects to database collection called Uploads (ie user's history of uploaded items)
setTimeout(() => {
  projectCollection = client.db().collection("Uploads");
}, 2000);

var storage = new GridFsStorage({
  url: "mongodb+srv://canurecycleit:SIT725@cluster0.oqdjdva.mongodb.net/?retryWrites=true&w=majority",
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
    };
  },
});

const retrieveFiles = async () => {
  const images = client.db("test").collection("photos.files").find({});

  let fileInfo = [];
  await images.forEach((doc) => {
    fileInfo.push({
      name: doc.filename,
      url: "http://localhost:3000/images/" + doc.filename,
      date: doc.uploadDate,
    });
  });

  return fileInfo;
};

const retrieveImages = async () => {
  const database = client.db("test");
  const bucket = new GridFSBucket(database, {
    bucketName: "photos",
  });

  return bucket;
};

var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = { uploadFilesMiddleware, retrieveFiles, retrieveImages };
