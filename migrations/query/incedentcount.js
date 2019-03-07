"use strict";

var incedentCount = {
	getIncidentCount : "SELECT incidentNumber from no_of_incidents",
	updateIncidentCount: "UPDATE no_of_incidents SET incidentNumber=incidentNumber+1;"
};
module.exports = incedentCount;