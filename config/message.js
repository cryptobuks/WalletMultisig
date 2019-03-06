var Nexmo = require('nexmo');
var constants = require("../constants.json").nexmo;
var nexmo = new Nexmo({
    apiKey: constants.API_KEY,
    apiSecret: constants.API_SECRET,
}, constants.options);

/***
  * Function will send message to child 
  * @param from: Sender mobile number
  * @param to: Receiver mobile number
  * @param message: Message to send
*/
function sendMessage(to, from, message, cb) {
    nexmo.message.sendSms(from, to, message, function (errNexmo, resNexmo) {
        if (errNexmo) {
            cb(errNexmo);
        }
        else {
            cb(null, resNexmo);
        }
    });
}

module.exports = {
    sendMessage
}