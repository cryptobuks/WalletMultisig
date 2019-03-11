const db = require("../../config/mysql");
const query = require("../../migrations/query/user");

/**
 * Function to insert user into database
 * @param {object} data having email, password, confirmpassword
 */
const addUser = (data) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
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
const isEmailExist = (email) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.getUserCount, email, function (error, result) {
				if (result) {
					if (result[0].usercount) {
						resolve(true);
					}
					else {
						resolve(false);
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

const loginUser = (req, res) => {

};

const getUserPassword = (email) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.getUserPassword, email, function (error, result) {
				if(result)
					resolve(result[0].password);
				else
					reject(error);
			});
			connection.release();
		}).catch((error) => {
			reject(error);
		});
	});
};

module.exports = {
	addUser,
	isEmailExist,
	loginUser,
};