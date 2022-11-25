/*const cardList = [
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
];*/

//function to send get request to server to receive card data
const getProjects = () => {
  $.get("/api/projects", (response) => {
    if (response.statusCode == 200) {
      addCards(response.data); //addCards function uses response data
    }
  });
};

const submitForm = () => {
  let formData = {};

  formData.first_name = $("#first_name").val();

  formData.last_name = $("#last_name").val();

  formData.password = $("#password").val();

  formData.email = $("#email").val();

  console.log("Form Data Submitted: ", formData);
};

//function to add cards to index.html
const addCards = (items) => {
  items.forEach((item) => {
    let itemToAppend =
      '<div class="col s4 center-align">' +
      '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' +
      item.image +
      '">' +
      '</div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right">more_vert</i></span><p><a href="#">' +
      item.link +
      "</a></p></div>" +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' +
      item.desciption +
      "</p>" +
      "</div></div></div>";

    $("#card-section").append(itemToAppend);
  });
};
//call the functions once the document has been loaded
$(document).ready(function () {
  $(".materialboxed").materialbox();
  $("#formSubmit").click(() => {
    submitForm();
  });
  getProjects(); //call the getProjects function to request the data from the server
  $(".modal").modal();
});
