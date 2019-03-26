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
router.get("/addOwnerPage", authenticate.superAdmin, (req, res) => {
	res.render("multisig/addOwner.hbs",{layout: "dashboard"});
});
router.post("/addOwner", authenticate.superAdmin, adminController.addOwner);

router.get("/removeOwnerPage", authenticate.superAdmin, (req, res) => {
	res.render("multisig/removeOwner.hbs",{layout: "dashboard"});
});
router.post("/removeOwner", authenticate.superAdmin, adminController.removeOwner);

router.get("/changeRequirementPage", authenticate.superAdmin, (req, res) => {
	res.render("multisig/changeRequirement.hbs",{layout: "dashboard"});
});
router.post("/chnageRequirement", authenticate.superAdmin, adminController.changeRequirement);



module.exports = router;
