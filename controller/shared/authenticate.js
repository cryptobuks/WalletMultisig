const isPasswordMatches = (data) => {
	return new Promise((resolve, reject)=>  {
		if(data.email=="" || data.password =="")
			reject("Please provide email and password");
		if(data.password === data.confirmpassword)
			resolve(true);
		else
			reject("Password and Confirm Password are not matching");
	});
};

/**
 * Function to check whether superAdmin session is expired or not
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const superAdmin = (req, res, next) => {
	if(req.session.user) 
	{
		if(req.session.user.active) {
			if(req.session.user.type == 1) 
			{
				next();
			}
			else {
				res.render("error", {success: false, error:"Not a valid user"});
			}
		}
		else {
			res.render("error", {success: false, error:"Please Wait for Admin Verification"});
		}	
	}
	else 
	{
		res.render("error", {success: false, error:"Please Login"});
	}
};

/**
 * Function to check whether Admin session is expired or not
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const onlyAdmin = (req, res, next) => {
	if(req.session.user) 
	{
		if(req.session.user.active) {
			if(req.session.user.type == 3) 
			{
				next();
			}
			else {
				res.render("error", {success: false, error:"Not a valid user"});
			}
		}
		else {
			res.render("error", {success: false, error:"Please Wait for Admin Verification"});

		}	
	}
	else 
	{
		res.render("error", {success: false, error:"Please Login"});
	}
};

/**
 * Function to check whether Admin session is expired or not
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const onlyUser = (req, res, next) => {
	if(req.session.user) 
	{
		if(req.session.user.active) {
			if(req.session.user.type == 2) 
			{
				next();
			}
			else {
				res.render("error", {success: false, error:"Not a valid user"});
			}
		}
		else {
			res.render("error", {success: false, error:"Please Wait for Admin Verification"});

		}
	}
	else 
	{
		res.render("error", {success: false, error:"Please Login"});
	}
};

/**
 * Function to check whether user's session is expired or not
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const allUser = (req, res, next) => {
	if(req.session.user) 
	{
		if(req.session.user.active) {
			if(req.session.user.type) 
			{
				next();
			}
			else {
				res.render("error", {success: false, error:"Not a valid user"});
			}
		}
		else {
			res.render("error", {success: false, error:"Please Wait for Admin Verification"});

		}
	}
	else 
	{
		res.render("error", {success: false, error:"Please Wait for Admin Verification"});
	}
};

/**
 * Function to check whether user's session is expired or not
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const allAdmin = (req, res, next) => {
	if(req.session.user && req.session.user.active) 
	{
		next();
	}
	else 
	{
		res.render("error", {success: false, error:"Please Wait for Admin Verification"});
	}
};

module.exports = {
	isPasswordMatches,
	superAdmin,
	onlyUser,
	allUser,
	onlyAdmin,
	allAdmin
};