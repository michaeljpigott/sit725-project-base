const upload = require("../models/uploadModel");
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
//const model = await tf.loadLayersModel('https://foo.bar/tfjs_artifacts/model.json');
//const prediction = model.predict(example);


// let predict = function(){
//   console.log("predict funtion works")
//   const result = "dog"
//   return result
// }

const uploadFiles = async (req, res) => {
    try {
      const prediction = predict();
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