let projectModel = require("../models/project");

// this will save a new item to user history
// const createItem = (req, res) => {
//   console.log("New item added", req.body);
//   var newItem = req.body;
//   projectModel.insertItem(newItem, (err, result) => {
//     if (err) {
//       res.json({ statusCode: 400, message: err });
//     } else {
//       res.json({
//         statusCode: 200,
//         message: "item successfully added",
//         data: result,
//       });
//     }
//   });
// };

// this will get all items from user history
// const retrieveItems = (req, res) => {
//   projectModel.getItems((err, result) => {
//     if (err) {
//       res.json({ statusCode: 400, message: err });
//     } else {
//       res.json({ statusCode: 200, message: "success", data: result });
//     }
//   });
// };

// this will delete an item from user history
// const deleteItem = (req, res) => {
//   console.log("Item deleted", req.body.id);
//   projectModel.removeItem(req.body.id, (err, result) => {
//     if (err) {
//       res.json({ statusCode: 400, message: err });
//     } else {
//       res.json({
//         statusCode: 200,
//         message: "item successfully deleted",
//         data: result,
//       });
//     }
//   });
// };

// module.exports = { retrieveItems, createItem, deleteItem };
