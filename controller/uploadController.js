let Model = require("../models/uploadModel");


const predictionUpload = async (req, res) => {
  var newProject = req.body;
  Model.predictionModel(newProject);
};

const uploadFiles = async (req, res) => {
    try {
      await Model.uploadFilesMiddleware(req, res);
      console.log(req.file);
  
      if (req.file == undefined) {
        return res.send('<script>alert("Please Select An Image ! "); window.location.href = "/upload"; </script>');
      }
  
      return res.send('<script>alert("Prediction Saved."); window.location.href = "/upload"; </script>');
      
    } catch (error) {
      console.log(error);
  
      return res.send('<script>alert("Error! Please Try Again."); window.location.href = "/upload"; </script>');
    }
  };

  
module.exports =  {uploadFiles,predictionUpload};