"use strict";

//status 0 : request is new. Once iy is approved then status become 2
var userRoleSql = {
	getAllRequest: "SELECT * FROM erc20_request WHERE status = 0",
	updateRequestStatus: "UPDATE erc20_request SET status = 1 WHERE id = ?",
	newRequest: "INSERT INTO erc20_request SET ?"
};

module.exports = userRoleSql;