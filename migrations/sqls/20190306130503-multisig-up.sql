/* Replace with your SQL commands */


CREATE TABLE IF NOT EXISTS user(
    email VARCHAR(30) PRIMARY KEY,
    password VARCHAR(128) NOT NULL,
    type TINYINT NOT NULL,
    rophston_address VARCHAR(60) NOT NULL,
    local_blockchain_address VARCHAR(60) NOT NULL,
    active TINYINT NOT NULL 
);