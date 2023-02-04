const upload = require("../models/uploadModel");
//const prediction = model.predict(example);


// let predict = function(){
//   console.log("predict funtion works")
//   const result = "dog"
//   return result
// }

const uploadFiles = async (req, res) => {
    try {
      //const prediction = predict();
      await upload(req, res);
      console.log(req.file);
  
      if (req.file == undefined) {
        return res.send('<script>alert("Please Select An Image ! "); window.location.href = "/upload"; </script>');
        
      }
  
      return res.send('<script>alert("Prediction Saved"); window.location.href = "/upload"; </script>');
      
    } catch (error) {
      console.log(error);
  
      return res.send('<script>alert("Error! Please Try Again."); window.location.href = "/upload"; </script>');
    }
  };

  
module.exports =  {uploadFiles};