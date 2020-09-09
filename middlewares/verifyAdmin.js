const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyAdmin = (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  User.findOne({ _id }).then((user) => {
    if (user.email === "chukwudieze97@gmail.com" || _id === id) {
      return next();
    }
    res.status(401).json({ error: "You are not authorized" });
  });
};

module.exports = verifyAdmin;
