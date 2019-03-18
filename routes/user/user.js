const express = require("express");
const router = express.Router();
const userController = require("../../controller/user/users");
const authenticate = require("../../controller/shared/authenticate");

// var userController =

/* GET users listing. */
router.post("/register", userController.addUser);
router.post("/login", userController.loginUser);
router.get("/logout", [authenticate.allUser, userController.logoutUser]);
router.post("transferERC", [authenticate.allUser, userController.transferERC20Token]);
router.post("requestToken", [authenticate.allUser, userController.requestERC20Token]);

module.exports = router;