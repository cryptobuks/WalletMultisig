const db = require("../../config/mysql");
const query = require("../../migrations/query/user");

/**
 * Function to insert user into database
 * @param {object} data having email, password, confirmpassword
 */
const addAdmin = (data) => {
	return new Promise((resolve, reject)=>  {
		db.mysqlConnection((connection)=>{
			connection.query(query.insertIntoUser, data).then(()=>{
				resolve("User is added");
			}).catch((err)=>{
				reject(err);
			});

		});
	});
};

/**
 * Function to verify email is already in use or not
 * @param {string} email 
 */
const isEmailExist = (email) => {
	return new Promise((resolve, reject)=>  {
		db.mysqlConnection((connection)=>{
			connection.query(query.getUserCount, email).then((result)=>{
				if(result.usercount)
					resolve(true);
				else
					resolve(false);
			}).catch((err)=>{
				reject(err);
			});

		});
	});
};




module.export = {
	addAdmin,
	isEmailExist,
};