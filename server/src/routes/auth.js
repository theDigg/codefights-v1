const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let router = express.Router();

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.error(err);
    } else if (user) {
      res.json({ error: "Email already taken" });
    } else {
      const saltRounds = 5;
      let salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(password, salt);
      var newUser = new User();
      newUser.username = username;
      newUser.password = hash;
      newUser.save(err => {
        if (err) {
          console.log("error in newUser.save " + err);
          res.json({ error: err.toString() });
        } else {
          res.json({ success: "Successful signup!" });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, user) => {
    let userData = user.toJSON();
    if (!user) {
      console.log("User doesn't exist");
      res.json({ error: "User doesn't exist" });
    } else if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ user: userData }, "secret");
        res.json({ token });
      } else {
        console.log("Password is incorrect");
        res.json({ error: "Password is incorrect" });
      }
    } else {
      console.log("Error during login");
      res.json({ error: "Error during login" });
    }
  });
});

module.exports = router;
