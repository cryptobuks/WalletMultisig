
const sgMail = require('@sendgrid/mail');
const hbs = require('express-handlebars').create();
const constants = require('../constants.json').mail;
sgMail.setApiKey(constants.apiKey);



const sendMail = function (mailOptions, callback) {
	sgMail.send(mailOptions, function (error, result) {
		callback(error, result);
	});
};

/**
 * This function creates mail options
 * @param {array} receipientList 
 * @param {string} subject 
 * @param {html} html 
 */
var createMailOptions = function (recipientList, subject, html, attachment) {
	let mailOptions = {
		from: constants.sourceEmail,
		to: recipientList,
		subject,
		html
	};
	if (attachment) {
		//mailOptions['attachments'] = attachment;
		let data = fs.readFileSync(attachment[0].path);
		var base64data = new Buffer(data).toString('base64');
		mailOptions['attachments'] = [{
			filename: path.basename(attachment[0].path),
			content: base64data,
			type: 'application/pdf'
		}];
	}
	return mailOptions;
};

var createTemplate = function (data, cb) {
	hbs.renderView('views/emailTemplates/notificationMail.hbs', { catalog: data, layout: false }, function (err, result) {
		if (err) {
			cb(err);
		} else {
			cb(null, result);
		}
	});
};

/**
 * send mail to child
 * @param {array} recipientList 
 * @param {string} subject 
 * @param {string} data 
 */
var testMail = function (recipientList, subject, data, cb) {
	// return new Promise((resolve, reject) => {
	createTemplate(data, function (error, html) {
		if (!error) {
			let mailOptions = createMailOptions(recipientList, subject, html);
			sendMail(mailOptions, function (err, result) {
				if (err) cb(err);
				else cb(null, result);
			});
		}
		else {
			cb(error);
		}
	});
}


module.exports = {
	testMail
};


// call yestMail as
// mail.testMail("vazratkaravinash@gmail.com","test mail","check working",function(error,result){
// 	if(error){
// 	  //console.log(error);
// 	}
// 	else {
// 	  //console.log(result);
// 	}
// 	});