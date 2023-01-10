//function for location autocomplete input field

$(document).ready(function () {
  let councilData = {
    Apple: null,
    Microsoft: null,
    Google: "https://placehold.it/250x250",
  };
  $("input.autocomplete").autocomplete({
    data: councilData,
    onAutocomplete: function () {
      let suburbOutput = document.getElementById("suburb-output");
      let suburbInfo = document.getElementById("suburb-info");
      suburbInfo.style.display = "inline";
      suburbOutput.innerText = document.getElementById("suburb").value;
    },
  });
});
