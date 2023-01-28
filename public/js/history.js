const getImages = () => {
  $.get("/api/history", (response) => {
    if (response.statusCode == 200) {
      addImages(response.data);
    }
  });
};

const addImages = (data) => {
  data.forEach((image) => {
    const imageType = getImageType(image);
    const recyclable = isRecyclable(imageType);

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
                  <p class="item-type">${imageType}</p>
                </div>
                <div class="col s6 right-align">
                  <p class="item-upload-date">${formatDate(image.date)}</p>
                </div>
                <div class="col s10">
                  <p class="item-result">Item ${resultText(
                    recyclable
                  )} be recycled</p>
                </div>
                <div class="col s2 right-align">
                  <p class="item-result-symbol ${resultSymbol(recyclable)}">
                    <i class="material-icons">${resultSymbol(recyclable)}</i>
                  </p>
                </div>
              </div>
            </div>
          </div>`
    );
  });
};

const getImageType = (image) => {
  let itemType;
  if (image.name.length > 45) {
    itemType = "Plastic";
  } else {
    itemType = "Trash";
  }
  return itemType;
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
      return true;

    case "Trash":
      return false;
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
