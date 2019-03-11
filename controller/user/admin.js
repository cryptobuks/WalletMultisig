const shared = require("../shared/authenticate");
const adminModel = require("../../model/user/admin");

/**
 * Function to add new admin in the application
 * @param {object} req 
 * @param {object} res 
 */
const addAdmin = (req, res) => {
	shared.isPasswordMatches(req.body).then((result)=>{
		if(result){
			adminModel.isEmailExist(req.body.email).then((result)=>{
				if(result) {
					res.render("user/registerAdmin",{success: false, error: "Email Already exists"}); 
				}
				else {
					var data = {
						email: req.body.email,
						password: req.body.password,
						type: 3,
						rophston_address: "cdcgdshcsjhcvsdj",
						local_blockchain_address: "sdsadafsf",
						active: 0
					};
					adminModel.addAdmin(data).then(()=>{
						res.render("user/login",{success: true, message: "Successfully register. Please wait for admin confirmation...."});
					}).catch((err)=> {
						res.render("user/registerAdmin",{success: false, error: err}); 
					});
				}
			});
		}
		else {
			res.render("user/registerAdmin",{success: false, error: "Password and confirm password should be same"});
		}
	});
};

module.exports = {
	addAdmin
};