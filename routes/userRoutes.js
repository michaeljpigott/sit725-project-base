var express = require("express");
var router = express.Router();
var User = require("../models/user");
const bcrypt = require("bcrypt");
bodyParser = require("body-parser");

const saltRounds = 10;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/register", function (req, res, next) {
  return res.render("register.ejs");
});

router.post("/register", async (req, res, next) => {
  console.log(req.body);
  var personInfo = req.body;

  if (
    !personInfo.email ||
    !personInfo.username ||
    !personInfo.password ||
    !personInfo.passwordConf
  ) {
    res.send();
  } else {
    if (personInfo.password == personInfo.passwordConf) {
      User.findOne({ email: personInfo.email }, async (err, data) => {
        if (!data) {
          var c;
          User.findOne({}, async (err, data) => {
            if (data) {
              console.log("if");
              c = data.unique_id + 1;
            } else {
              c = 1;
            }

            const hashedPwd = await bcrypt.hash(
              personInfo.password,
              saltRounds
            );
            const newPerson = await User.create({
              unique_id: c,
              email: personInfo.email,
              username: personInfo.username,
              password: hashedPwd,
              passwordConf: hashedPwd,
            });

            newPerson.save(function (err, Person) {
              if (err) console.log(err);
              else console.log("Success");
            });
          })
            .sort({ _id: -1 })
            .limit(1);
          res.send({ Success: "You are now registered. Go to Login." });
        } else {
          res.send({ Success: "Email is already used." });
        }
      });
    } else {
      res.send({ Success: "password is not a match" });
    }
  }
});

router.get("/login", function (req, res, next) {
  return res.render("login.ejs");
});

router.post("/login", async (req, res, next) => {
  // try {
  User.findOne({ email: req.body.email }, async (err, data) => {
    if (data) {
      const cmp = await bcrypt.compare(req.body.password, data.password);
      if (cmp) {
        req.session.userId = data.unique_id;
        res.send({ Success: "Success!", userId: data.unique_id });
      } else {
        res.send({ Success: "Wrong username or password." });
      }
    } else {
      res.send({ Success: "This Email Is not registered!" });
    }
  });
});

router.get("/profile", function (req, res, next) {
  console.log("profile");
  User.findOne({ unique_id: req.session.userId }, function (err, data) {
    console.log("data");
    console.log(data);
    if (!data) {
      res.redirect("/");
    } else {
      return res.render("data.ejs", { name: data.username, email: data.email });
    }
  });
});

router.get("/logout", function (req, res, next) {
  console.log("logout");
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/index");
      }
    });
  }
});

router.get("/forgetpass", function (req, res, next) {
  res.render("forget.ejs");
});

router.post("/forgetpass", function (req, res, next) {
  //console.log('req.body');
  //console.log(req.body);
  User.findOne({ email: req.body.email }, function (err, data) {
    console.log(data);
    if (!data) {
      res.send({ Success: "This Email Is not regestered!" });
    } else {
      // res.send({"Success":"Success!"});
      if (req.body.password == req.body.passwordConf) {
        data.password = req.body.password;
        data.passwordConf = req.body.passwordConf;

        data.save(function (err, Person) {
          if (err) console.log(err);
          else console.log("Success");
          res.send({ Success: "Password changed!" });
        });
      } else {
        res.send({
          Success: "Password does not matched! Both Password should be same.",
        });
      }
    }
  });
});

module.exports = router;
