"use strict";

var childCount = {
	getChildCount : "SELECT childNumber from no_of_childs",
	updateChildCount: "UPDATE no_of_childs SET childNumber=childNumber+1;"
};
module.exports = childCount;