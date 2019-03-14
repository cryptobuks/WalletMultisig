const Web3 = require("web3");
const constants = require("../constants.json");
const contractInstance = require("./contractInstance");
//TODO
var blockchainData = {};

var web3 = new Web3(new Web3.providers.HttpProvider(constants.blockchain.localBlockchain));
blockchainData.web3 = web3;
web3.eth.defaultAccount = web3.eth.accounts[0];

//multisig instance
contractInstance.smartContractInstance("MultiSigWalletContractAddress").then((_multisigInstance)=>{
	blockchainData.multisigInstance = _multisigInstance;
}).catch((err)=>{
	//TODO
	console.log("Unable to create smart contract instance"+err);
});

//erc20 instance
contractInstance.smartContractInstance("TokenContractAddress").then((_erc20)=>{
	blockchainData.erc20 = _erc20;
}).catch((err)=>{
	//TODO
	console.log("Unable to create smart contract instance"+err);
});

module.exports = blockchainData;