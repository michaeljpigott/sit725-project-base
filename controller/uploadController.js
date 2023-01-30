const upload = require("../models/uploadModel");

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.file);

    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }

    return res.send({
      message: "File has been uploaded.",
    });
  } catch (error) {
    console.log(error);

    return res.send({
      message: "Error when trying upload image: ${error}",
    });
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

module.exports = { uploadFiles, getListFiles, downloadImages };
