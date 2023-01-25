var express = require("express");
var router = express.Router();
let controller = require("../controller");
var User = require('../models/user');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

router.use('/', express.static(path.join(__dirname, 'public')))
router.use(bodyParser.json())

let rootDir = process.cwd(); // the root directory of the project on your local computer

router.get("");
// this renders the history.html file on the /history route
// this will get all the user items to display on the page
router.get("/history", (req, res) => {
  //   controller.projectController.retrieveItems(req, res);
  let fileLocation = rootDir + "/public/history.html"; // creates absolute path for html file
  res.sendFile(fileLocation);
});

// this renders the location.html file on the /location route
router.get("/location", (req, res) => {
  let fileLocation = rootDir + "/public/location.html"; // creates absolute path for html file
  res.sendFile(fileLocation);
});

// this should save a new item to user history
// router.post("/history", (req, res) => {
//   controller.projectController.createItem(req, res);
// });

// this should delete an item from user history
// router.delete("/history", (req, res) => {
//   controller.projectController.deleteItem(req, res);
// });

//Create the API for suburbs

router.get("/", (req, res) => {
  controller.locationController.retrieveSuburbs(req, res);
});

//Uploads

router.get("/upload", (req, res) => {
  let fileLocation = rootDir + "/public/upload.html"; // creates absolute path for html file
  res.sendFile(fileLocation);
});

router.post("/upload", controller.uploadController.uploadFiles);

//User data - login, registration and change password functionality

router.post('/api/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
});

router.get('/change-password', function (req, res, next) {
	res.render("change-password.html");
});

router.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) { // the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
});

router.get('/login', function (req, res, next) {
	res.render("login.html");
});

router.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
});

router.get('/register', function (req, res, next) {
	res.render("register.html");
});

module.exports = router;  