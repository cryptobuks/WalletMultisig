"use strict";

var userRoleSql = {
	getUserRole: "SELECT id FROM user_role WHERE type = ?"
};

module.exports = userRoleSql;