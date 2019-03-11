

// const authenticate = (req, res, next) => {
// 	// if(sdd)
// 	// a+blur;

// };

const isPasswordMatches = (data) => {
	return new Promise((resolve)=>  {
		if(data.password === data.confirmpassword)
			resolve(true);
		else
			resolve(false);
	});
};

module.exports = {
	// authenticate,
	isPasswordMatches
};