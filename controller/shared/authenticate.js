

// const authenticate = (req, res, next) => {
// 	// if(sdd)
// 	// a+blur;

// };

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

module.exports = {
	// authenticate,
	isPasswordMatches
};