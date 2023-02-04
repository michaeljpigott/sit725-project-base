//const { isObjectIdOrHexString } = require("mongoose");

$(document).ready(function () {
  //I put all code inside this function so Javascript doesn't work until webpage has been loaded.

  //the function to pull the suburbs off /api/suburbs and build an array;
  var suburbArray = [];
  function getSuburbs(suburbArray) {
    $.get("api/suburbs", (response, suburbArray) => {
      if (response.statusCode == 200) {
        createLocationArray(response.data, suburbArray);
      }
    });
  }

  //the function to build an array with a list of Melbourne suburbs - used by getSuburbs()
  function createLocationArray(items, locationArray) {
    var locationArray = [];
    items.forEach((item) => {
      locationArray.push(
        '"' + item.suburb + " (" + item.Postcode + ")" + '"' + ": null"
      );
    });
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
        getSuburbsAndLGAs(suburbOutput);
        suburbOutput.innerText = document.getElementById("suburb").value;
      },
    });
  }

  //the function that gets a copy of the the data from /api/suburbs and runs the findLGA() function
  function getSuburbsAndLGAs(suburbOutput) {
    $.get("api/suburbs", (response) => {
      if (response.statusCode == 200) {
        findLGA(response.data, suburbOutput);
      }
    });
  }

  //the function to find the name of the lga to match the council and place it on the location page
  function findLGA(response, suburbInfo) {
    let suburbPostcodeString = suburbInfo.innerText;
    let bracketStart = suburbPostcodeString.indexOf(" (");
    let suburbOnly = suburbPostcodeString.slice(0, bracketStart);
    console.log(suburbOnly);
    console.log(response[0]);
    for (let i = 0; i < response.length; i++) {
      if (suburbOnly === response[i].suburb) {
        console.log("LGA equals: " + response[i].LGA);
        let lgaName = response[i].LGA;
        document.getElementById("council-name").innerText = lgaName;
      }
    }
  }

  getSuburbs();
});
//the functionality to save location

const saveLocation = () => {
  console.log("saveLocation function has run");
  let saveData;
  saveData = $("#council-name").text();
  console.log(saveData);
};

//calls the saveLocation function once the document has been loaded
$(document).ready(function () {
  $("#saveLocationButton").click(() => {
    saveLocation();
  });
});

//script for sockets
