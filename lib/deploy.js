const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const jsonfile = require('jsonfile');
const path = require('path');
const log4js = require('log4js');
const logger = log4js.getLogger('');
const address = path.join(__dirname, '../config/contractAddress.json');
const config = require('../config/contract.json');

console.log(config.localBlockchain);
const web3 = new Web3(new Web3.providers.HttpProvider(config.localBlockchain));

/**
 * Function will return the estimated gas amount required for function execution
 * @param {string} data 
 */
const estimateGas = (data) => {
	return new Promise((resolve) => {
		web3.eth.estimateGas({ data: '0x' + data }, function (err, res) {
			if (err) {
				resolve(3000000);
			}
			else {
				resolve(res);
			}
		});
	});
}

/**
 * Function to read the content of sol file
 * @param {string} filepath 
 */
const readSolFile = (filepath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filepath, function (err, content) {
			if (!err) {
				logger.debug("In readSolFile, success in reading file");
				resolve(content);
			}
			else {
				logger.error("Unable to read solc file:" + filepath);
				reject(err);
			}
		});

	});

}

/**
 * 
 * Function to Compile smart contract
 * @param {string} data 
 */
const compileSmartContract = (data) => {
	return new Promise((resolve, reject) => {
		resolve(solc.compile(data, 1));
	});
}

/**
 * Function to unlock ethereum account
 * @param {address} account ethereum account address
 */
const unlockUserAccount = (account, password) => {
	return new Promise((resolve, reject) => {
		web3.personal.unlockAccount(account, password, function (err, result) {
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
}

/**
 * Function to deploy smart contract on Blockchain
 * @param {Object } contractInfo contractInfo = {
							gasRequired,
							contract,
							bytecode,
							contractName,
							abi,
							param: [param1, param2]
						}
 */
const commonCodeTodeployContract = (contractInfo) => {
	return new Promise((resolve, reject) => {
		contractInfo.contract.new(contractInfo.param[0], contractInfo.param[1], { data: '0x' + contractInfo.bytecode, from: web3.eth.coinbase, gas: contractInfo.gasRequired }, (err, res) => {
			if (err) {
				logger.error("Fail to create contract instance: ", account);
				reject(err);
			} else {
				if (res.address) {
					logger.info(`${contractInfo.contractName} contract Address: ` + res.address);
					const contractAddress = jsonfile.readFileSync(address);
					contractAddress[`${contractInfo.contractName}ContractAddress`] = {
						'address': res.address,
						'abi': contractInfo.abi
					};
					fs.writeFileSync(address, JSON.stringify(contractAddress, null, 4), { spaces: 2 });
					logger.info("Successfully deployed contract");
					resolve(true);

				}
			}
		});
	});
}

/**
 * Function that deploys Hospital.sol contract on blockcahin
 * @param {bytecode} bytecode of Hospital.sol contract
 * @param {web3.eth.coinbase} Account which deployed the contract
 * @param {gasEstimate} gas required
 */
const deployContracts = (contractName, param1, param2) => {
	return new Promise((resolve, reject) => {
		unlockUserAccount(web3.eth.coinbase, config.coinBasePassword).then((result) => {
			readSolFile(`../contracts/${contractName}.sol`).then((input) => {
				compileSmartContract(input.toString()).then((output) => {
					const bytecode = output.contracts[`:${contractName}`].bytecode;
					const abi = JSON.parse(output.contracts[`:${contractName}`].interface);
					const contract = web3.eth.contract(abi);
					estimateGas(bytecode).then((gasRequired) => {
						let contractInfo = {
							gasRequired,
							contract,
							bytecode,
							contractName,
							abi,
							param: [param1, param2]
						}
						commonCodeTodeployContract(contractInfo).then((result) => {
							resolve(result);
						})
					})
				})
			})
		}).catch(err => reject(err));
	});
}

// const deployContracts = (contractName, param1, param2) => {
// 	return new Promise((resolve, reject) => {
// 		web3.personal.unlockAccount(web3.eth.coinbase, config.coinBasePassword, function (err, result) {
// 			if (err) {
// 				console.log('Error while unlocking the coinbase account');
// 			} else {
// 				console.log('Coinbase unlocked successfully');
// 				const input = fs.readFileSync(`../contracts/${contractName}.sol`);
// 				const output = solc.compile(input.toString(), 1);
// 				// console.log(output)
// 				const bytecode = output.contracts[`:${contractName}`].bytecode;
// 				const abi = JSON.parse(output.contracts[`:${contractName}`].interface);
// 				const contract = web3.eth.contract(abi);

// 				estimateGas(bytecode).then((gasRequired) => {
// 					if (param1) {
// 						console.log("<<<<<<<<<<<<<<<<<<", param1, param2)

// 						contract.new(param1, param2, { data: '0x' + bytecode, from: web3.eth.coinbase, gas: gasRequired }, (err, res) => {
// 							if (err) {
// 								console.log(err);
// 								reject(err);
// 							} else {
// 								if (res.address) {
// 									console.log(`${contractName} contract Address: ` + res.address);
// 									const contractAddress = jsonfile.readFileSync(address);
// 									contractAddress[`${contractName}ContractAddress`] = {
// 										'address': res.address,
// 										'abi': abi
// 									};
// 									fs.writeFileSync(address, JSON.stringify(contractAddress, null, 4), { spaces: 2 });
// 									resolve(true);
// 								}
// 							}
// 						});
// 					}
// 					else {
// 						contract.new({ data: '0x' + bytecode, from: web3.eth.coinbase, gas: gasEstimate }, (err, res) => {
// 							if (err) {
// 								console.log(err);
// 								reject(err);
// 							} else {
// 								if (res.address) {
// 									console.log(`${contractName} contract Address: ` + res.address);
// 									const contractAddress = jsonfile.readFileSync(address);
// 									contractAddress[`${contractName}ContractAddress`] = {
// 										'address': res.address,
// 										'abi': abi
// 									};
// 									fs.writeFileSync(address, JSON.stringify(contractAddress, null, 4), { spaces: 2 });
// 									resolve(true);
// 								}
// 							}
// 						});
// 					}
// 				});

// 			}
// 		});
// 	});

// }
/**
 * Function to deploy smart contracts
 */

const deploy = () => {
	return new Promise((resolve, reject) => {
		deployContracts('Token', null, null).then((res) => {
			let param1 = [];
			param1.push(web3.eth.accounts[0]);
			let param2 = 1;
			deployContracts('MultiSigWallet', param1, param2).then((result) => {
				resolve("Successfully deployed contracts");
			});
		}).catch((err) => {
			logger.info("Failed to deploy contract", err)
			reject(err);
		});
	})
}

deploy().then((res) => {

}).catch((err) => {

});


module.exports = {
	deploy,
	readSolFile,
	unlockUserAccount,
	estimateGas
}