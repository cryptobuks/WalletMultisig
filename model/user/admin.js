const db = require("../../lib/mysql");
const query = require("../../migrations/query/user");
const erc20Query = require("../../migrations/query/erc20Request");
const BlockchainErc20 = require("../shared/blockchain");
const BlockchainMultisig = require("../shared/multisig");
const contract = require("../../config/contractAddress.json");

/**
 * Function to insert user into database
 * @param {object} data having email, password, confirmpassword
 */
const addAdmin = (requestdata) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			var data;
			data = {
				email: requestdata.email,
				password: requestdata.password,
				rophston_address:requestdata.account,
				local_blockchain_address: requestdata.account
			};
			if(requestdata.type){
				data.type = 1;
				data.active = 1;
			}
			else {
				data.type = 3;
				data.active = 0;
			}
			
			connection.query(query.insertIntoUser, data, function (err, result) {
				if (result) {
					resolve("User is added");
				}
				else {
					reject(err);
				}
			});
		}).catch((err) => {
			reject(err);
		});
	});
};

/**
 * Function to verify email is already in use or not
 * @param {string} email 
 */
const isEmailExist = (email, option) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.getUserCount, [email], function (error, result) {
				if (result) {
					if (!option) {

						if (result[0].usercount) {
							resolve(true);
						}
						else {
							reject("Invalid Email");
						}
					}
					else {
						if (result) {
							if (result[0].usercount) {
								reject("Email already exists");
							}
							else {
								resolve(false);
							}
						}
					}
				}
				else {
					reject(error);
				}
			});
			connection.release();
		}).catch((error) => {
			reject(error);
		});
	});
};

/**
 * Function tp return the list of unapproved user
 */
const approveRequestList = () => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.getUnapprovedUser, function (error, result) {
				if (result) {
					resolve(result);
				}
				else {
					reject(error);
				}
			});
			connection.release();
		}).catch((error) => {
			reject(error);
		});
	});
};


/**
 * Function tp return the list of unapproved user
 */
const approveLoginRequest = (email) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.approveUser, [email],function (error, result) {
				if (result) {
					resolve(result);
				}
				else {
					reject(error);
				}
			});
			connection.release();
		}).catch((error) => {
			reject(error);
		});
	});
};

/**
 * Function to get amount and user blockchain id from database
 * @param {string} id 
 */
const getRequestedUserDetails = (id) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(erc20Query.getRequestById, [id],function (error, result) {
				if (result) {
					resolve(result[0]);
				}
				else {
					reject(error);
				}
			});
			connection.release();
		}).catch((error) => {
			reject(error);
		});
	});
};

/**
 * This function will transfer 
 * @param {Object} data  {amount and blockchain address}
 */
const transferERC20Tokens = (req, data) => {
	return new Promise((resolve, reject) => {
		let encodedABI = BlockchainErc20.encodedABIOfTransferFrom(req, data);
		let methodData = {};
		methodData.data = encodedABI;
		methodData.destination = contract["TokenContractAddress"].address;
		methodData.value = 0;
		BlockchainMultisig.submitTransaction(req, methodData).then((result)=> {
			resolve(result);
		}).catch((error)=> {
			reject(error);
		});
	});
};

/**
 * Function to get All requested user details
 */
const getTransferRequestList = () => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(erc20Query.getAllRequest, function (error, result) {
				if (result) {
					resolve(result);
				}
				else {
					reject(error);
				}
			});
			connection.release();
		}).catch((error) => {
			reject(error);
		});
	});
};

/**
 * Function to update the status of token request
 * @param {String} id 
 */
const markRequestAsConfirmed = (id) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(erc20Query.updateRequestStatus, [id], function (error, result){
				connection.release();
				resolve(result);
			});
		}).catch((error) => {
			reject(error);
		});
	});
};

module.exports = {
	addAdmin,
	isEmailExist,
	approveLoginRequest,
	approveRequestList,
	transferERC20Tokens,
	getRequestedUserDetails,
	getTransferRequestList,
	markRequestAsConfirmed
};