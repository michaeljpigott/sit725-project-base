import autocomplete from "autocompleter";

var countries = [
  { label: "United Kingdom", value: "UK" },
  { label: "United States", value: "US" },
];

var input = document.getElementById("suburb");

autocomplete({
  input: input,
  fetch: function (text, update) {
    text = text.toLowerCase();
    // you can also use AJAX requests instead of preloaded data
    var suggestions = countries.filter((n) =>
      n.label.toLowerCase().startsWith(text)
    );
    update(suggestions);
  },
  onSelect: function (item) {
    input.value = item.label;
  },
});
