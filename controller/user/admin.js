const shared = require("../shared/authenticate");
const adminModel = require("../../model/user/admin");
const addAdmin = (req, res) => {
	shared.isPasswordMatches(req.body).then((result)=>{
		if(result){
			adminModel.isEmailExist(req.body.email).then((result)=>{
				if(result) {
					res.send({success: false, error: "Email Already exists"}); 
				}
				else {
					var data = {
						email: req.body.email,
						password: req.body.password,
						type: 3,
						rophsten_address: "cdcgdshcsjhcvsdj",
						local_blockchain_address: "sdsadafsf",
						active: 0
					};
					adminModel.addAdmin(data).then(()=>{
						res.send({success: true, message: "Successfully register. Please wait for admin confirmation...."});
					}).catch((err)=> {
						res.send({success: false, error: err}); 
					});
				}
			});
		}
		else {
			res.send({success: false, error: "Password and confirm password should be same"});
		}
	});

    
    
};

module.export = {
	addAdmin
};