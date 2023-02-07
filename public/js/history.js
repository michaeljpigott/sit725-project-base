const getImages = () => {
  $.get("/api/history", (response) => {
    if (response.statusCode == 200) {
      addImages(response.data);
    }
  });
};

const removeImageFromApp = (imageId) => {
  console.log("sending ajax to route");
  $.ajax({
    url: "/api/history",
    data: JSON.stringify({ image: imageId }),
    type: "DELETE",
    contentType: "application/json",
    success: (result) => {
      console.log(result.message);
      location.reload(); // automatically reloads the page
    },
  });
};

const addImages = (data) => {
  data.forEach((image) => {
    const imagePrediction = isRecyclable(image.prediction);
    console.log(image.predictionText);

    $(".history-section").append(
      `<div class="row history-item">
            <div class="col s4 center-align">
              <div class="item-image">
                <img class="" src="${image.url}" />
              </div>
            </div>
            <div class="col s8">
              <div class="item-details">
                <div class="col s6">
                  <p class="item-type">${imagePrediction.type}</p>
                </div>
                <div class="col s6 right-align">
                  <p class="item-upload-date">${formatDate(image.date)}</p>
                </div>
                <div class="col s10">
                  <p class="item-result">Item ${resultText(
                    imagePrediction.recyclable
                  )} be recycled</p>
                </div>
                <div class="col s2 right-align">
                  <p class="item-result-symbol ${resultSymbol(
                    imagePrediction.recyclable
                  )}">
                    <i class="material-icons">${resultSymbol(
                      imagePrediction.recyclable
                    )}</i>
                  </p>
                </div>
              </div>
              <div>
                <a class="btn delete-btn" data-record-id="${
                  image.id
                }" data-target="">
                  
                Delete</a>
              </div>
            </div>
          </div>`
    );
  });
  addDeleteFunction();
};

const addDeleteFunction = () => {
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      removeImageFromApp(event.target.getAttribute("data-record-id"));
    });
  });
};

const formatDate = (imageDate) => {
  const date = new Date(imageDate);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateText = `${day}/${month + 1}/${year}`;
  return dateText;
};

const isRecyclable = (imageType) => {
  switch (imageType) {
    case "Plastic":
      return { type: "Plastic", recyclable: true };

    case "Trash":
      return { type: "Trash", recyclable: false };

    case "Metal":
      return { type: "Metal", recyclable: true };

    case "Glass":
      return { type: "Glass", recyclable: true };

    case "undefined":
      return { type: "Unknown", recyclable: false };
  }
};

const resultText = (recyclable) => {
  return recyclable ? "can" : "cannot";
};

const resultSymbol = (recyclable) => {
  return recyclable ? "check" : "close";
};

$(document).ready(function () {
  getImages();
});
