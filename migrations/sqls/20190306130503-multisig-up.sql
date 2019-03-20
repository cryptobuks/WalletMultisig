/* Replace with your SQL commands */


CREATE TABLE IF NOT EXISTS user(
    email VARCHAR(30) PRIMARY KEY NOT NULL,
    password VARCHAR(128) NOT NULL,
    type TINYINT NOT NULL,
    rophston_address VARCHAR(60) NOT NULL,
    local_blockchain_address VARCHAR(60) NOT NULL,
    active TINYINT NOT NULL 
);


CREATE TABLE IF NOT EXISTS erc20_request(
    id varchar(128) PRIMARY KEY NOT NULL,
    amount FLOAT NOT NULL,
    status TINYINT NOT NULL,
    email VARCHAR(30) NOT NULL,
    FOREIGN KEY (email) REFERENCES user(email)
);