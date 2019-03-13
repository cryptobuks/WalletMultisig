const express = require("express");
const router = express.Router();
const userController = require("../../controller/user/users");
const authenticate = require("../../controller/shared/authenticate");

// var userController =

/* GET users listing. */
router.post("/register", userController.addUser);
router.post("/login", userController.loginUser);
router.get("/logout", [authenticate.allUser, userController.logoutUser]);


module.exports = router;