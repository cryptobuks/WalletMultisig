const blockchainObject = require("../../lib/web3");
const constants = require("../../constants.json");
const log4js = require("log4js");
const logger = log4js.getLogger("");

const createAccount = (data) => {
	return new Promise((resolve, reject)=>{
		blockchainObject.web3.personal.newAccount(data.password, function(err, account){
			if(err){
				reject(err);
			}
			else {
				resolve(account);
			}
		});
	});
};

/**
 * Function to unlock ethereum account
 * @param {address} account ethereum account address
 */
const unlockUserAccount = (data) => {
	return new Promise((resolve, reject) => {
		blockchainObject.web3.personal.unlockAccount(data.account, data.password, function (err, result) {
			if (err) {
				logger.error("Fail to unlock the account: ", data.account);
				reject(err);
			}
			else {
				logger.debug("Successfully unlock the account: ", data.account);
				resolve(result);
			}
		});
	});
};

// const estimateGas = () => {
// 	return new Promise((resolve, reject) => {
// 		web3.personal.unlockAccount(data.account, data.password, function (err, result) {
// 			if (err) {
// 				logger.error("Fail to unlock the account: ", account);
// 				reject(err);
// 			}
// 			else {
// 				logger.debug("Successfully unlock the account: ", account);
// 				resolve(result);
// 			}
// 		});
// 	});
// }

module.exports = {
	createAccount,
	unlockUserAccount,
};