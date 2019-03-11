/**
 * Function will create the session for login user
 * @param {object} req 
 * @param {Object} data User information
 */
const createSession = (req, data) => {
	req.session.user = data;
};


/**
 * Function will destroy the session of the user
 * @param {object} req 
 */
const destroySession = (req) => {
	req.session.user = "";
	req.session.destroy(function(err) {
		// cannot access session here
	});
};

module.exports = {
	createSession,
	destroySession
};