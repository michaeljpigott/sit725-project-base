var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
  {
    title: "Lamborghini",
    image: "/images/lamborghini.jpg",
    link: `<a href="https://unsplash.com/photos/X16zXcbxU4U?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">About this Lamborghini photo</a>`,
    desciption: `Photo by <a href="https://unsplash.com/@dhivakrishna?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Dhiva Krishna</a> on <a href="https://unsplash.com/s/photos/car?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    `,
  },
  {
    title: "Tesla",
    image: "/images/tesla.jpg",
    link: `<a href="https://unsplash.com/photos/kPUQOsfThag?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">About this Tesla photo</a>`,
    desciption: `Photo by <a href="https://unsplash.com/@technick_inc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tech Nick</a> on <a href="https://unsplash.com/s/photos/tesla?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
    `,
  },
];

//Add get request to get data from our backend server
app.get("/api/projects", (req, res) => {
  res.json({ statusCode: 200, data: cardList, message: "Success" });
});

var port = process.env.port || 3000;

app.listen(port, () => {
  console.log("App listening to: " + port);
});
