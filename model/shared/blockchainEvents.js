const blockchainObject = require("../../lib/web3");
// const constants = require("../../constants.json");
const log4js = require("log4js");
const logger = log4js.getLogger("");

/**
* Function will return all events when amount is transfred
*/  
const depositEvent = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.multisig.Deposit({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};


/**
* Function will return all events when transaction is confirmed
*/  
const confirmationEvent = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.multisig.Confirmation({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};

/**
* Function will return all events when confirmation to transaction is revoked
*/  
const revocationEvent = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.multisig.Revocation({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};

/**
* Function will return all events when execution is successfull
*/  
const submissionEvent = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.multisig.Submission({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};

/**
* Function will return all events when execution is successfull
*/  
const executionEvent = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.multisig.Execution({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};

/**
* Function will return all events when execution is failed
*/  
const executionFailureEvent = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.multisig.ExecutionFailure({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};

/**
* Function will return all events when number of confirmation is changed
*/  
const requirementChangeEvent = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.multisig.RequirementChange({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};


/**
* Function will return all events when owner is removed
*/  
const ownerRemovalEvent = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.multisig.OwnerRemoval({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};


/**
* Function will return all events when owner is added
*/  
const ownerAdditionEvent = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.multisig.OwnerAddition({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};

/**
* Function will return all events when owner is added
*/  
const getAllEvents = () => {
    return new Promise((resolve, reject)=> {
        let event = blockchainObject.multisig.allEvents({}, {fromBlock: 0, toBlock: 'latest'});
        event.get(function(error, logs){
            if(error){
                reject(error);
            }
            else {
                console.log(logs)
                resolve(logs);
            }
        });
    });
};

module.exports = {
    ownerAdditionEvent,
    ownerRemovalEvent,
    requirementChangeEvent,
    executionFailureEvent,
    executionEvent,
    depositEvent,
    revocationEvent,
    confirmationEvent,
    submissionEvent,
    getAllEvents
};