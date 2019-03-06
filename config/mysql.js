const mysql = require('mysql');
const db = require('../database.json').development;
const pool = mysql.createPool(db);
const log4js = require('log4js');
const logger 

/**
 * Create a connection pool and return one connection to the user
 * @param {*} cb 
 */
const mysqlConnection= () => {
    return new Promise((resolve, reject)=>{
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                resolve(null, connection);
            }
        });
    })
};

// function mysqlConnection(cb) {
//     pool.getConnection(function (err, connection) {
//         if (err) {
//             cb(err);
//         } else {
//             cb(null, connection);
//         }
//     });
// }

module.exports = {
    mysqlConnection
}

//use this
/*
        connection.query('SELECT something FROM sometable', function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
       
          // Don't use the connection here, it has been returned to the pool.
        });
*/