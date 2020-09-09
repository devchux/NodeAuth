const express = require("express");
const { getUsers, createNewUser, loginUser, deleteUser, updateUser } = require('../controllers/userController');
const UserRouter = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

UserRouter.route("/users").get(verifyToken, getUsers);
UserRouter.route("/register").post(createNewUser);
UserRouter.route("/login").post(loginUser);
UserRouter.route("/users/delete/:id").delete(verifyToken, deleteUser);
UserRouter.route("/users/update/:id").put(verifyToken, verifyAdmin, updateUser);


module.exports = UserRouter;
