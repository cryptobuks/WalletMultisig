"use strict";

var venuesSql = {
	getVenuesType: "SELECT type FROM venues WHERE code = ?",
	getAllVenues: "SELECT * from venues",
	getVenueById: "SELECT * from venues WHERE type = ?",
	insertVenues: "INSERT INTO venues (id, type, code) VALUES ?"
};

module.exports = venuesSql;