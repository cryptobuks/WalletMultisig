"use strict";

//status 0 : request is new. Once iy is approved then status become 2
var userRoleSql = {
	getAllRequest: "SELECT * FROM erc20_request WHERE status = 0",
	updateRequestStatus: "UPDATE erc20_request SET status = 1 WHERE id = ?",
	newRequest: "INSERT INTO erc20_request SET ?",
	getRequestById: "SELECT erc20_request.amount AS amount, user.local_blockchain_address AS address FROM erc20_request, user WHERE user.email = erc20_request.email and id = ?",
};

module.exports = userRoleSql;