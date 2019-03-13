"use strict";
var loginSql = {
	getUserPassword: "SELECT password FROM  user WHERE email = ?",
	getUserData: "SELECT * from user WHERE email= ?",
	insertIntoUser: "INSERT INTO user SET ?",
	getUserCount: "SELECT count(*) AS usercount FROM user WHERE email = ?",
	getUnapprovedUser: "SELECT * FROM user WHERE active = 0 and type != 1",
	approveUser: "UPDATE user SET active=1 where email = ?",
	insertUsers: "INSERT INTO user (id, username, password, email, mobile_number, userType, organisationName, code, cat, uat) VALUES ?"
};

module.exports = loginSql;