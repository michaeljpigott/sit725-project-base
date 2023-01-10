//function for location autocomplete imput field

$(document).ready(function () {
  $("input.autocomplete").autocomplete({
    data: {
      Apple: null,
      Microsoft: null,
      Google: "https://placehold.it/250x250",
    },
    onAutocomplete: function () {
      let suburbOutput = document.getElementById("suburb-output");
      suburbOutput.innerText = document.getElementById("suburb").value;
    },
  });
});

