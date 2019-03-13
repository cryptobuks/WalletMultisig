var express = require("express");
var router = express.Router();
/* GET home page. */
router.get("/", function(req, res) {
	res.render("user/login", { title: "Express" });
});
router.get("/register", function(req, res) {
	res.render("user/registerUser", { title: "Express" });
});
router.get("/registeradmin", function(req, res) {
	res.render("user/registerAdmin", { title: "Express" });
});

router.get("/partials/dashboard", function(req, res) {
	res.render("layouts/dashboard", { title: "Express" });
});
module.exports = router;
