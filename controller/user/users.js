const shared = require("../shared/authenticate");
const userModel = require("../../model/user/user");

/**
 * Function to add new user in the application
 * @param {object} req 
 * @param {object} res 
 */
const addUser = (req, res) => {
	shared.isPasswordMatches(req.body).then((result)=>{
		if(result){
			userModel.isEmailExist(req.body.email).then((result)=>{
				if(result) {
					res.render("user/registerUser",{success: false, error: "Email Already exists"}); 
				}
				else {
					var data = {
						email: req.body.email,
						password: req.body.password,
						type: 2,
						rophston_address: "cdcgdshcsjhcvsdj",
						local_blockchain_address: "sdsadafsf",
						active: 0
					};
					userModel.addUser(data).then(()=>{
						res.render("user/login",{success: true, message: "Successfully register. Please wait for Admin confirmation...."});
					}).catch((err)=> {
						res.render("user/registerUser",{success: false, error: err}); 
					});
				}
			});
		}
		else {
			res.render("user/registerUser",{success: false, error: "Password and confirm password should be same"});
		}
	});
};

module.exports = {
	addUser
};