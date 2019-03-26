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

/**
 * Function to get a list of all requested users
 * @param {*} req 
 * @param {*} res 
 */
const approveRequestList = (req, res) => {
	adminModel.approveRequestList().then((result)=>{
		//res.send(result);
		res.render("multisig/homeSuperAdmin", {success: true, data: result, layout:"dashboard"});
	}).catch((err)=>{
		res.render("multisig/homeSuperAdmin", {success: false, error: err, layout:"dashboard"});
	});
};

/**
 * Function to approve the login request of requested Admin and user
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Function to transfer ERC20 tokens to the requested user
 * @param {object} req 
 * @param {object} res 
 */
const transferERC20Tokens = (req, res) => {
	adminModel.getRequestedUserDetails(req.query.id).then((userData)=>{
		return adminModel.transferERC20Tokens(req, userData ).then((result)=>{
			return adminModel.markRequestAsConfirmed(req.query.id).then(()=>{
				res.render("multisig/homeSuperAdmin", {success: true, data: result,  layout:"dashboard"});
			});
		});
	}).catch((err)=>{
		res.render("multisig/homeSuperAdmin", {success: false, error: err,  layout:"dashboard"});
	});
};

/**
 * Function will return List of users who requested for Tokens	
 * @param {Object} req 
 * @param {Object} res 
 */
const listOfTransferRequest = (req, res) => {
	adminModel.getTransferRequestList().then((result)=>{
		res.render("multisig/erc20request", {success: true, data: result,  layout:"dashboard"});
	}).catch((err)=>{
		res.render("multisig/erc20request", {success: false, error: err,  layout:"dashboard"});
	});
};

/**
 * Function will add new Owner in multisig wallet
 * @param {Object} req 
 * @param {Object} res 
 */
const addOwner = (req, res) => {
	adminModel.multisigOwnerOperations(req, 1).then((result)=>{
		res.render("multisig/addOwner.hbs", { success: true , data: result, message: "Successfully added new Owner"});
	}).catch((error)=>{
		res.render("multisig/addOwner.hbs", { success: true , error: error, message: "Failed to add new Owner"});
	});
};

/**
 * Function will remove Owner in multisig wallet
 * @param {Object} req 
 * @param {Object} res 
 */
const removeOwner = (req, res) => {
	adminModel.multisigOwnerOperations(req, 2).then((result)=>{
		res.render("multisig/removeOwner.hbs", { success: true , data: result, message: "Successfully remove Owner"});
	}).catch((error)=>{
		res.render("multisig/removeOwner.hbs", { success: true , error: error, message: "Failed to remove Owner"});
	});
};

/**
 * Function will add new Owner in multisig wallet
 * @param {Object} req 
 * @param {Object} res 
 */
const changeRequirement = (req, res) => {
	adminModel.changeRequirement(req.query.count).then((result)=>{
		res.render("multisig/removeOwner.hbs", { success: true , data: result, message: "Successfully changed Requirement"});
	}).catch((error)=>{
		res.render("multisig/removeOwner.hbs", { success: true , error: error, message: "Failed to change requirement"});
	});
};

module.exports = {
	addAdmin,
	approveLoginRequest,
	approveRequestList,
	transferERC20Tokens,
	listOfTransferRequest,
	addOwner,
	removeOwner,
	changeRequirement
};