var express = require("express");
var router = express.Router();
var userController = require("../../controller/user/users");

// var userController =

/* GET users listing. */
router.post("/register", userController.addUser);
router.post("/login", userController.loginUser);

module.exports = router;