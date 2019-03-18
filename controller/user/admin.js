const shared = require("../shared/authenticate");
const adminModel = require("../../model/user/admin");
const bcrypt = require("../../lib/crypto");
const blockchain = require("../../model/shared/blockchain");

/**
 * Function to add new admin in the application
 * @param {object} req 
 * @param {object} res 
 */
const addAdmin = (req, res) => {
	shared.isPasswordMatches(req.body).then(()=>{
		return adminModel.isEmailExist(req.body.email, 1).then(()=>{
			return bcrypt.encryptPassword(req.body.password).then((hashPassword)=>{
				req.body.password = hashPassword;
				return blockchain.createAccount(req.body).then((account)=>{
					req.body.account = account;
					return adminModel.addAdmin(req.body).then(()=>{
						res.render("user/login",{success: true, message: "Successfully register. Please wait for Admin confirmation." });
					});
				});
			});
		});
	}).catch((err)=>{
		res.render("user/registerAdmin",{success: false, error: err});
	});
};

const approveRequestList = (req, res) => {
	adminModel.approveRequestList().then((result)=>{
		//res.send(result);
		res.render("multisig/homeSuperAdmin", {success: true, data: result, layout:"dashboard"});
	}).catch((err)=>{
		res.render("multisig/homeSuperAdmin", {success: false, error: err, layout:"dashboard"});
	});
};

const approveLoginRequest = (req, res) => {
	adminModel.approveLoginRequest(req.query.email).then(()=>{
		return adminModel.approveRequestList().then((result)=>{
			//res.send(result);
			res.render("multisig/homeSuperAdmin", {success: true, data: result,  layout:"dashboard"});
		});
	}).catch((err)=>{
		res.render("multisig/homeSuperAdmin", {success: false, error: err,  layout:"dashboard"});
	});
};

const transferERC20Tokens = (req, res) => {
	adminModel.transferERC20Tokens(req.query.id).then(()=>{
		return adminModel.requestTokenList().then((result)=>{
			//res.send(result);
			if(req.type == 1) {
				res.render("multisig/homeSuperAdmin", {success: true, data: result,  layout:"dashboard"});
			}
			else {
				res.render("multisig/homeAdmin", {success: true, data: result,  layout:"dashboardAdmin"});
			}
		});
	}).catch((err)=>{
		if(req.type == 1) {
			res.render("multisig/homeSuperAdmin", {success: false, error: err,  layout:"dashboard"});
		}
		else {
			res.render("multisig/homeAdmin", {success: false, error: err,  layout:"dashboardAdmin"});
		}
	});
};

module.exports = {
	addAdmin,
	approveLoginRequest,
	approveRequestList,
	transferERC20Tokens
};