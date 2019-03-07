"use strict";

var organizationsSql = {
	getOrganizationsName: "SELECT name FROM organizations WHERE code = ?",
	getAllOrganizations: "SELECT * from organizations",
	insertOrganizations: "insert into organizations (id, name, code) VALUES ?"
};

module.exports = organizationsSql;