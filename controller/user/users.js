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

/**
 * Function to destroy user session when user logout
 * @param {object} req 
 * @param {object} res 
 */
const logoutUser = (req, res) => {
	session.destroySession(req);
	res.render("user/login");
}; 

/**
 * Function to transfer the ERC20 tokens to the requested user.
 * @param {*} req 
 * @param {*} res 
 */
const transferERC20Token = (req, res) => {
	userModel.transferERC20Token(req).then((result)=>{
		res.render("multisig/transfer", {success: true, result: result});
	}).catch((error)=>{
		res.render("multisig/transfer", {success: false, error: error});
	});
};

/**
 * Function to request the ERC20 tokens to Admin 
 * @param {*} req 
 * @param {*} res 
 */
const requestERC20Token = (req, res) => {
	userModel.requestERC20Token(req).then((result)=>{
		res.render("multisig/requestToken", {success: true, message:"Successfully send request for tokens", result: result, layout:"dashboardUser.hbs"});
	}).catch((error)=>{
		res.render("multisig/requestToken", {success: false, message:"Error in requesting tokens", error: error,  layout:"dashboardUser.hbs"});
	});
};

const getBlanace = (req, res) => {
	blockchain.getBalance(req).then((result)=>{
		if(req.session.user.type == 1) {
			res.render("multisig/balance.hbs", {success: true, message:"Successfully send request for tokens", result: result.toString(), layout:"dashboard.hbs"});
		}
		else if(req.session.user.type == 1) {
			res.render("multisig/balance.hbs", {success: true, message:"Successfully send request for tokens", result: result.toString(), layout:"dashboardUser.hbs"});
		}
		else {
			res.render("multisig/balance.hbs", {success: true, message:"Successfully send request for tokens", result: result.toString(), layout:"dashboardAdmin.hbs"});
		}
	}).catch((error)=>{
		res.render("multisig/balance.hbs", {success: false, message:"Error in requesting tokens", error: error, layout:"dashboardUser.hbs"});
	});
};

module.exports = {
	addUser,
	loginUser,
	logoutUser,
	transferERC20Token,
	requestERC20Token,
	getBlanace,
};