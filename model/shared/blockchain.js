const web3 = require("../../lib/web3");
const log4js = require("log4js");
const logger = log4js.getLogger("");

const createAccount = (data) => {
    return new Promise((resolve, reject)=>{
        web3.eth.personal.newAccount(data.password).then((account)=>{
            resolve(account);
        }).catch((err)=> {
            reject(err);
        })
    })
};

/**
 * Function to unlock ethereum account
 * @param {address} account ethereum account address
 */
const unlockUserAccount = (data) => {
	return new Promise((resolve, reject) => {
		web3.personal.unlockAccount(data.account, data.password, function (err, result) {
			if (err) {
				logger.error("Fail to unlock the account: ", account);
				reject(err);
			}
			else {
				logger.debug("Successfully unlock the account: ", account);
				resolve(result);
			}
		});
	});
};

module.exports = {
    createAccount,
    unlockUserAccount

}