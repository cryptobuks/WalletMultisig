const cryptoJSON = require('crypto-json');
// const utils = require('./utils');
const cipher = 'aes-256-cbc-hmac-sha1';
const encoding = 'hex';
const secretKeys = require('../constants.json').encryption;

let encrypt = function (object, keys) {
    let encrypted = cryptoJSON.encrypt(object, secretKeys.secret, {
        algorithm: cipher,
        encoding: encoding,
        keys: keys
    });
    return encrypted;
}

let decrypt = function (encryptedObject, keys) {
    let decrypted = cryptoJSON.decrypt(encryptedObject, secretKeys.secret, {
        algorithm: cipher,
        encoding: encoding,
        keys: keys
    })
    return decrypted;
}



let encryptAll = function (array, keys) {
    let encrypted = encrypt({array},['array'].concat(keys)).array;
    return encrypted;
}

let decryptAll = function (encryptedArray, keys) {
    let decrypted = decrypt({encryptedArray},['encryptedArray'].concat(keys)).encryptedArray;
    return decrypted;
}


// console.log(encrypt({name: "avinash"},["name"]));
// console.log(decrypt({ name: '28c6084831df7e7f1f818ca33d7d0f6a' },["name"]).name);
module.exports={
    encrypt,
    decrypt,
    encryptAll,
    decryptAll
}