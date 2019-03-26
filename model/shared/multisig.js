const blockchainObject = require("../../lib/web3");
// const constants = require("../../constants.json");
const log4js = require("log4js");
const logger = log4js.getLogger("");


const encodedABIforAddOwner = (address) => {
	return blockchainObject.multisig.addOwner.getData(address);
};

const encodedABIforRemoveOwner = (address) => {
	return blockchainObject.multisig.removeOwner.getData(address);
};

const encodedABIforReplaceOwner = (req) => {
	return blockchainObject.multisig.replaceOwner.getData(req.session.user.local_blockchain_address, req.body.changeAddress);
};

const encodedABIforChangeRequirement = (count) => {
	return blockchainObject.multisig.changeRequirement.getData(count);
};


/**
 * Function to submit multisig transactions.
 * @param {*} req 
 * @param {*} methodData 
 */
const submitTransaction = (req, methodData) => {
	return new Promise((resolve, reject)=> {
		let gasEstimate = blockchainObject.multisig.submitTransaction.estimateGas(methodData.destination, methodData.value, methodData.data);
		if(!gasEstimate)
			gasEstimate = 3000000;
		blockchainObject.multisig.submitTransaction(methodData.destination, methodData.value, methodData.data, { gas: gasEstimate}, function(error, result){
			if(error){
				logger.error("Error in submitTransaction of multisig" + error);
				reject(error);
			}
			else {
				logger.info("Successfully submited multisig Transaction"+ result);
				resolve(result);
			}
		});
	});
};

/**
 * Function to confirm the transactions which are perform using multisig wallet
 * @param {object} req 
 */
const confirmTransaction = (req) => {
	return new Promise((resolve, reject)=> {
		const gasEstimate = blockchainObject.multisig.confirmTransaction.estimateGas(req.body.transactionId);
		blockchainObject.multisig.confirmTransaction(req.body.transactionId, { gas: gasEstimate, from: req.session.user.rophsten_address }, function(error, result){
			if(error){
				reject(error);
			}
			else {
				logger.info("Successfully confirmed multisig Transaction"+ result);
				resolve(result);
			}
		});
	});
};

/**
 * Function to revoke the confirm trasnactions if it is not executed
 * @param {object} req 
 */
const revokeConfirmation = (req) => {
	return new Promise((resolve, reject)=> {
		const gasEstimate = blockchainObject.multisig.revokeConfirmation.estimateGas(req.body.transactionId);
		blockchainObject.multisig.revokeConfirmation(req.body.transactionId, { gas: gasEstimate, from: req.session.user.rophsten_address }, function(error, result){
			if(error){
				reject(error);
			}
			else {
				logger.info("Successfully revoke confirmation multisig Transaction"+ result);
				resolve(result);
			}
		});
	});
};


module.exports = { 
	revokeConfirmation,
	confirmTransaction,
	submitTransaction,
	encodedABIforChangeRequirement,
	encodedABIforReplaceOwner,
	encodedABIforRemoveOwner,
	encodedABIforAddOwner
};
