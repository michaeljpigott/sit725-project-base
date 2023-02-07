const classes = {0: "Cardboard", 1: "Glass", 2: "Metal", 3:"Paper", 4:"Plastic", 5: "Trash" }

// 
let imagesPreview = function(input, placeToInsertImagePreview) {
  if (input.files) {
    let filesAmount = input.files.length;
    for (i = 0; i < filesAmount; i++) { // change to only preview one image
      let reader = new FileReader();
      reader.onload = function(event) {
        $($.parseHTML('<img>'))
          .attr("src", event.target.result)
          .attr("id",'selected-image')
          .appendTo(placeToInsertImagePreview);
      };
      reader.readAsDataURL(input.files[i]);
    }
  }
};

// Loading model. Note: Server port needs to be opened in order to load model. 
let model;
(async function () {
  try{model = await tf.loadLayersModel("http://127.0.0.1:5501/public/model_json/model.json");
  }
  catch (err){
    alert("Error: Model not loaded. Make sure server is live and reload.")
  }
    
})();


// tensorImage is the function that preprocessing the image ready for prediction
let tensorImage = function(){
  let tensor; 
  let image = $("#selected-image").get(0)
  if (image == null) {
    alert("Please Select An Image!")
    return location.reload() // relaods the page if no image is selected.
  }
  tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([384, 512])
        .toFloat()
        .expandDims();
  return tensor
  };

  var prediction; 
  let predictions_array; 
  // predictImage function call the AI to predict image. 
  // Input: tensor array returned from tensorImage function
  // Output: prediction of image (string)
  let predictImage = async function(tensor){
    let predictions_array = await model.predict(tensor).data();
      
    let top5 = Array.from(predictions_array)
    .map(function (p, i) {
        return {
            probability: p,
            className: classes[i]
        };
    }).sort(function (a, b) {
        return b.probability - a.probability;
    }).slice(0, 1); 

    $("#prediction-list").empty();

    top5.forEach(function (p) {
        $("#prediction-list").append(`
        ${'Material: ' + p.className}
        ${'(' + p.probability.toFixed(3) * 100 +'% Accurate)'}
        `);
        
        prediction = p.className
        return prediction
      });
      return prediction
    }
    

//ajax function...
const predictionAjax = (project) => {
  $.ajax({
      url: '/prediction',
      data: project,
      type: 'POST',
      // success: (result) => {
      //     alert(result.message);
      //     //location.reload(); // it automatically reloads the page 
      // }
  })
}

$(document).ready(function() {

  $("#input-files").on("change",function () {
    imagesPreview(this,"div.preview-images")
  });

  $("#submitted-button").click(async function() {
    tensor = tensorImage()
    predictImage(tensor).then((result)=> {
      prediction = result
      resolvedPromise(prediction);
      console.log(prediction )
    })

    function resolvedPromise(prediction) {
      let formData = {};
      formData.Material = prediction;
      console.log(formData)
      predictionAjax(formData)
  };
})
});