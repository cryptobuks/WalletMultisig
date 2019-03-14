const shared = require("../shared/authenticate");
const userModel = require("../../model/user/user");
const bcrypt = require("../../lib/crypto");
const session = require("../../lib/session");
const blockchain = require("../../model/shared/blockchain");
/**
 * Function to add new user in the application
 * @param {object} req 
 * @param {object} res 
 */
const addUser = (req, res) => {
	shared.isPasswordMatches(req.body).then(()=>{
		return userModel.isEmailExist(req.body.email, 1).then(()=>{
			return bcrypt.encryptPassword(req.body.password).then((hashPassword)=>{
				req.body.password = hashPassword;
				return blockchain.createAccount(req.body).then((account)=>{
					req.body.account = account;
					return userModel.addUser(req.body).then(()=>{
						res.render("user/login",{success: true, message: "Successfully register. Please wait for Admin confirmation." });
					});
				});
				
			});
		});
	}).catch((err)=>{
		res.render("user/registerUser",{success: false, error: err});
	});
};

/**
 * Function to validate user while logging
 * @param {object} req 
 * @param {object} res 
 */
const loginUser = (req, res) => {
	userModel.isEmailExist(req.body.email, 0).then(()=>{
		return userModel.getUserPassword(req.body.email).then((password)=>{
			return bcrypt.verifyPassword(req.body.password,password).then(()=>{
				return userModel.getUserDetails(req.body.email).then((data)=>{
					session.createSession(req, data);
					switch(data.type){
					case 1: res.render("multisig/homeSuperAdmin",{success: true, data: data, layout: "dashboard.hbs"});
						break;
					case 2: res.render("multisig/homeUser",{success: true, data: data, layout: "dashboardUser.hbs"});
						break;
					case 3: res.render("multisig/homeAdmin",{success: true, data: data, layout: "dashboardAdmin.hbs"});
					}
				});
			});
		});
	}).catch((err)=>{
		res.render("user/login",{success: false, error:err});
	});
};

const logoutUser = (req, res) => {
	session.destroySession(req);
	res.render("user/login");
};

module.exports = {
	addUser,
	loginUser,
	logoutUser,
};