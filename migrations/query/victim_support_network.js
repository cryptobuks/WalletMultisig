"use strict";

var victimSupportNetworkSql = {
	getVictimSupportNetworkId: "SELECT id FROM victim_support_network WHERE type = ?",
	getAllVictimSupportNetwork: "SELECT * from victim_support_network",
	getVictimSupportNetworkById: "SELECT * from victim_support_network WHERE code = ?",
	insertVictimSupportNetwork: "INSERT INTO victim_support_network (id, name, code) VALUES ?"
};

module.exports = victimSupportNetworkSql;