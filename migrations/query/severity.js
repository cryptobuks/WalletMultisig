"use strict";

var severitySql = {
	getSeverityType: "SELECT type FROM severity WHERE code = ?",
	getAllSeverityTypes: "SELECT * FROM severity",
	getSeverityTypesById: "SELECT * FROM severity WHERE type = ?",
	insertSeverity: "INSERT INTO severity (id, type, code) VALUES ?"
};

module.exports = severitySql;