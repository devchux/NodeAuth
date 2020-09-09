const User = require("../models/userModel");
// const registerValidation = require("../helpers/validation");
const debug = require("debug")("app:userRoutes");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.getUsers = (req, res) => {
  User.find()
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((e) => {
      debug(e);
      res.status(400).json({
        error: "Could not fetch any user",
      });
    });
};

exports.createNewUser = (req, res) => {
  // Validate data
  //   const { error } = registerValidation(req.body);
  //   if (error) return res.status(400).json({ msg: error });

  const { name, email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    User.create({ name, email, password })
      .then((newUser) => {
        res.status(200).json({ newUser, success: 'Registration successful' });
      })
      .catch((e) => {
        debug(e);
        res.status(400).json({
          error: "Could not register user",
        });
      });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ error: "User does not exist" });
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return debug(err);
      if (!match) {
        return res.status(400).json({ error: "Password is incorrect" });
      } else {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
          res.status(200).json({ user, token, success: 'Login successful' });
        }
    });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  if (req.user._id != id) return res.status(400).json({ error: "You are not authorized to delete this user" });
  User.findByIdAndDelete({ _id: id })
    .then((user) => {
      res.status(200).json({ user, success: "User is successfully deleted" });
    })
    .catch((err) => {
      debug(err);
    });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  let user = User.findOne({ _id: id });
  user.name = req.body.name;
  user.email = req.body.email;

  user.save;
  res.status(200).json({ success: "User is successfully updated" });
};
