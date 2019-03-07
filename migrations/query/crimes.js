"use strict";

var crimeSql = {
	getCrimeType: "SELECT type FROM crimes WHERE code = ?",
	getAllCrime: "SELECT * from crimes",
	getCrimeById: "SELECT * from crimes WHERE type = ?",
	insertCrimes: "INSERT INTO crimes (id, type, code) VALUES ?"
};

module.exports = crimeSql;