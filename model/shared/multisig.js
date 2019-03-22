const blockchainObject = require("../../lib/web3");
// const constants = require("../../constants.json");
const log4js = require("log4js");
const logger = log4js.getLogger("");


const encodedABIforAddOwner = (req) => {
	return blockchainObject.multisig.addOwner.getData(req.session.user.local_blockchain_address);
};

const encodedABIforRemoveOwner = (req) => {
	return blockchainObject.multisig.removeOwner.getData(req.session.user.local_blockchain_address);
};

const encodedABIforReplaceOwner = (req) => {
	return blockchainObject.multisig.replaceOwner.getData(req.session.user.local_blockchain_address, req.body.changeAddress);
};

const encodedABIforChangeRequirement = (req) => {
	return blockchainObject.multisig.changeRequirement.getData(req.session.user.local_blockchain_address, req.body.amount);
};

const submitTransaction = (req, methodData) => {
    return new Promise((resolve, reject)=> {
        let gasEstimate = blockchainObject.multisig.submitTransaction.estimateGas(methodData.destination, methodData.value, methodData.data);
		if(!gasEstimate)
			gasEstimate = 3000000;
		blockchainObject.multisig.submitTransaction(methodData.destination, methodData.value, methodData.data, { gas: gasEstimate}, function(error, result){
			if(error){
				reject(error);
			}
			else {
				resolve(result);
			}
		});
	});
};

const confirmTransaction = (req) => {
    return new Promise((resolve, reject)=> {
        const gasEstimate = blockchainObject.multisig.confirmTransaction.estimateGas(req.body.transactionId);
		blockchainObject.multisig.confirmTransaction(req.body.transactionId, { gas: gasEstimate, from: req.session.user.rophsten_address }, function(error, result){
			if(error){
				reject(error);
			}
			else {
				resolve(result);
			}
		});
	});
};

const revokeConfirmation = (req) => {
    return new Promise((resolve, reject)=> {
		const gasEstimate = blockchainObject.multisig.revokeConfirmation.estimateGas(req.body.transactionId);
		blockchainObject.multisig.revokeConfirmation(req.body.transactionId, { gas: gasEstimate, from: req.session.user.rophsten_address }, function(error, result){
			if(error){
				reject(error);
			}
			else {
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
