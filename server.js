var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

const addNumbers = (number1, number2) => {
  //create an anonymous function inside the object addNumbers
  var num1 = parseInt(number1);
  var num2 = parseInt(number2);
  var result = num1 + num2;
  return result;
};

app.get("/addTwoNumbers", (req, res) => {
  //create callback
  var number1 = req.query.number1; //req.query is a request object that is populated by request query strings that are found in a URL
  var number2 = req.query.number2;
  var result = addNumbers(number1, number2); //call the object with the function and add the two numbers together.
  res.json({ statusCode: 200, data: result, message: "Success" });
});

var port = process.env.port || 3000;

app.listen(port, () => {
  console.log("App listening to: http://localhost:" + port);
});
