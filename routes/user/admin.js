var express = require("express");
var router = express.Router();
var adminController = require("../../controller/user/admin");
const authenticate = require("../../controller/shared/authenticate");
/* GET users listing. */
router.post("/register",adminController.addAdmin);
router.get("/approverequests",authenticate.superAdmin, adminController.approveRequestList);
router.get("/approve",authenticate.superAdmin, adminController.approveLoginRequest);
router.get("/transfer", authenticate.superAdmin, adminController.transferERC20Tokens);
router.get("/transferRequestList", authenticate.superAdmin,  adminController.listOfTransferRequest);


module.exports = router;
