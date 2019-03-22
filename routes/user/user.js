const express = require("express");
const router = express.Router();
const userController = require("../../controller/user/users");
const authenticate = require("../../controller/shared/authenticate");

// var userController =

/* GET users listing. */
router.post("/register", userController.addUser);
router.post("/login", userController.loginUser);
router.post("/requestToken", [authenticate.allUser, userController.requestERC20Token]);
router.post("/transferERC", [authenticate.allUser, userController.transferERC20Token]);

router.get("/getBalance", [authenticate.allUser, userController.getBlanace]);

router.get("/logout", [authenticate.allUser, userController.logoutUser]);

//All Get API's
router.get("/requestToken", [authenticate.allUser], (req, res) => {
    res.render("multisig/requestToken", {layout: "dashboardUser.hbs"});
});


module.exports = router;