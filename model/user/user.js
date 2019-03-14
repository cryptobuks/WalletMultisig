const db = require("../../lib/mysql");
const query = require("../../migrations/query/user");

/**
 * Function to insert user into database
 * @param {object} data having email, password, confirmpassword
 */
const addUser = (requestdata) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			var data = {
				email: requestdata.email,
				password: requestdata.password,
				type: 2,
				rophston_address: requestdata.account,
				local_blockchain_address: "sdsadafsf",
				active: 0
			};
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
const isEmailExist = (email, option) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.getUserCount, [email], function (error, result) {
				if (result) {
					if (!option) {

						if (result[0].usercount) {
							resolve(true);
						}
						else {
							reject("Invalid Email");
						}
					}
					else {
						if (result) {
							if (result[0].usercount) {
								reject("Email already exists");
							}
							else {
								resolve(false);
							}
						}
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


const getUserPassword = (email) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.getUserPassword, email, function (error, result) {
				if (result)
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

const getUserDetails = (email) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.getUserData, email, function (error, result) {
				if (result[0].active)
					resolve(result[0]);
				else
					reject("Please wait for Admin Confirmation");
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
	getUserPassword,
	getUserDetails
};