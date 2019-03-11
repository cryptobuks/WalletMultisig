const bcrypt = require("bcrypt");
const constants = require("../../constants.json").bcrypt;

/**
 * Function will encrypt the password
 * @param {string} password 
 */
const encryptPassword = (password) => {
	return new Promise((resolve, reject)=>{
		bcrypt.hash(password, constants.saltRounds).then(function(hash) {
			resolve(hash);
		}).then((err)=>{
			reject(err);
		});
	});
};

/**
 * Function will verify the password of the user
 * @param {string} password 
 * @param {string} hash 
 */
const verifyPassword = (password, hash) => {
	return new Promise((resolve, reject)=>{
		bcrypt.compare(password, hash).then(function(res) {
			resolve(res);
		}).catch((err)=>{
			reject(err);
		});
	});
};


module.exports = {
	encryptPassword,
	verifyPassword
};