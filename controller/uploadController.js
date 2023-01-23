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

  
module.exports =  {uploadFiles};