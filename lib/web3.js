const Web3 = require("web3");
const config = require("../config/contract.json");

//TODO
var web3 = new Web3(new Web3.providers.HttpProvider(config.localBlockchain));
web3.eth.defaultAccount = web3.eth.accounts[0];


module.exports = web3;