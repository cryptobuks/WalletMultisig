'use strict';

const fs = require('fs');
const IPFS = require('ipfs');
const node = new IPFS();
const log4js = require('log4js');
const logger = log4js.getLogger('logFile');

/**
 * Function that uploads file onto IPFS
 * @param {JSON} fileDetails Json containing file details that needs to be updated on IPFS
 * @param {function} callback callback function
 */
const uploadDataToIPFS = function(data, callback) {
    data = new Buffer(JSON.stringify(data)),
	node.files.add(data, (err, resIpfs) => {
		if (err) {
			return callback(err);
		}
		callback(null, resIpfs[0].hash);
	});
};

/**
 * Function that gets the document contents from IPFS, based on the document's hash
 * @param {String} ipfsHash IPFS hash of the document that is being uploaded onto IPFS
 * @param {function} callback callback function
 */
const getDataFromIPFS = function(ipfsHash, callback) {
	node.files.cat(ipfsHash, function(err, data) {
		callback(err, data);
	});
};

module.exports = {
    uploadDataToIPFS,
    getDataFromIPFS
};