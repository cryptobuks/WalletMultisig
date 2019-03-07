"use strict";
var loginSql = {
	getUserPassword: "SELECT password FROM  user WHERE username = ?",
	getUserData: "SELECT id, username, userType, email, mobile_number, organisationName, code from user WHERE username= ?",
	insertIntoUser: "INSERT INTO user SET ?",
	getUserCount: "SELECT count(*) as usercount from user where email = ?",
	insertUsers: "INSERT INTO user (id, username, password, email, mobile_number, userType, organisationName, code, cat, uat) VALUES ?",
	getAllOrganizations: "SELECT organisationName, code, id FROM user",
	getOrganizationsById: "SELECT organisationName, code, id FROM user where id = ?",
	getOrganizationsName: "SELECT organisationName as name FROM user WHERE code = ?",
	getChildInfoById: "SELECT email, mobile_number FROM user where id = ?"

};

module.exports = loginSql;