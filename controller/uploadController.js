const upload = require("../models/uploadModel");

const predictionUpload = async (req, res) => {
  var newProject = req.body;
  console.log(req.body);
  upload.predictionModel(newProject);
};

const uploadFiles = async (req, res) => {
  try {
    await upload.uploadFilesMiddleware(req, res);
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(
        '<script>alert("Please Select An Image ! "); window.location.href = "/upload"; </script>'
      );
    }

    return res.send(
      '<script>alert("Prediction Saved."); window.location.href = "/upload"; </script>'
    );
  } catch (error) {
    console.log(error);

    return res.send(
      '<script>alert("Error! Please Try Again."); window.location.href = "/upload"; </script>'
    );
  }
};

const getListFiles = async (req, res) => {
  const files = await upload.retrieveFiles();

  if (!files) {
    res.json({ statusCode: 400, message: err });
  } else {
    res.json({ statusCode: 200, message: "success", data: files });
  }
};

const downloadImages = async (req, res) => {
  try {
    const bucket = await upload.retrieveImages();

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const deleteImage = (req, res) => {
  console.log("Image deleting", req.body.image);
  upload.removeImage(req.body.image, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({
        statusCode: 200,
        message: "image successfully deleted",
        data: result,
      });
    }
  });
};

module.exports = {
  predictionUpload,
  uploadFiles,
  getListFiles,
  downloadImages,
  deleteImage,
};
