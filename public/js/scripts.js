var search_terms = [
  "apple",
  "apple watch",
  "apple macbook",
  "apple macbook pro",
  "iphone",
  "iphone 12",
];

//getSuburbs();
$(document).ready(function () {
  var suburbArray = [];
  function getSuburbs(suburbArray) {
    $.get("api/suburbs", (response, suburbArray) => {
      if (response.statusCode == 200) {
        createLocationArray(response.data, suburbArray);
      }
    });
  }

  function createLocationArray(items, locationArray) {
    var locationArray = [];
    items.forEach((item) => {
      locationArray.push('"' + item.suburb + '"' + ": null");
    });

    //let jsonFile = JSON.stringify(locationArray);

    let councilData = locationArray;
    autocomplete(councilData);
  }

  //function to utilise the functionality of materialize autocomplete
  function autocomplete(councilData) {
    let elems = document.querySelectorAll(".autocomplete");
    var json = "{ " + councilData + " }";
    const obj = JSON.parse(json);
    M.Autocomplete.init(elems, {
      data: obj,
      onAutocomplete: function () {
        let suburbOutput = document.getElementById("suburb-output");
        let suburbInfo = document.getElementById("suburb-info");
        suburbInfo.style.display = "inline";
        $.get("api/suburbs", (response, suburbArray) => {
          if (response.statusCode == 200) {
            findLGA(response.data, suburbArray);
          }
          
        });
        suburbOutput.innerText = document.getElementById("suburb").value;
      },
    });
  }
  function findLGA(response) {
    console.log("hello there");
  }

  /* function findLGA(suburbOutput) {
    $.get("api/suburbs", (response, suburbArray) => {
      if (response.statusCode == 200) {
        for (let i = 0; i < response.length; i++) {
          if (suburbOutput === response[i].LGA) {
            let lgaOutput = response[i].LGA;
            lgaOutput.innerText = document.getElementByID("council-name");
            console.log("lgaOutput: " + lgaOutput);
          }
        }
      }
    });
  }*/
  getSuburbs();
});
