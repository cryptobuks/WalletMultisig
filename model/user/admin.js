const db = require("../../config/mysql");
const query = require("../../migrations/query/user");

/**
 * Function to insert user into database
 * @param {object} data having email, password, confirmpassword
 */
const addAdmin = (requestdata) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			var data;
			if(requestdata.type){
			 data = {
					email: requestdata.email,
					password: requestdata.password,
					type: 1,
					rophston_address: "cdcgdshcsjhcvsdj",
					local_blockchain_address: "sdsadafsf",
					active: 1
				};
			}
			else {
				 data = {
					email: requestdata.email,
					password: requestdata.password,
					type: 3,
					rophston_address: "cdcgdshcsjhcvsdj",
					local_blockchain_address: "sdsadafsf",
					active: 0
				};
			}
			
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

/**
 * Function tp return the list of unapproved user
 */
const approveRequestList = () => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.getUnapprovedUser, function (error, result) {
				if (result) {
					resolve(result);
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


/**
 * Function tp return the list of unapproved user
 */
const approveLoginRequest = (email) => {
	return new Promise((resolve, reject) => {
		db.mysqlConnection().then((connection) => {
			connection.query(query.approveUser, [email],function (error, result) {
				if (result) {
					resolve(result);
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


module.exports = {
	addAdmin,
	isEmailExist,
	approveLoginRequest,
	approveRequestList
};