// -- CREATE TABLE tbuser (
// --     id SERIAL PRIMARY KEY,
// --     email VARCHAR(120) UNIQUE NOT NULL,
// --     firstname VARCHAR(50),
// --     lastname VARCHAR(50),
// --     contact VARCHAR(25),
// --     accounts TEXT[],
// --     password TEXT NOT NULL,
// --     country TEXT,
// --     currency VARCHAR(5) NOT NULL DEFAULT 'USD',
// --     createdAt TIMESTAMP NOT NULl DEFAULT CURRENT_TIMESTAMP,
// --     updatedAt TIMESTAMP NOT NULl DEFAULT CURRENT_TIMESTAMP
// -- );
// -- INSERT INTO tbuser (
// --     email, password, firstname, lastname, contact, country, currency
// -- )
// -- VALUES (
// --     'manasvi@gmail.com', 'M@N@svi@123', 'maansvi', 'virani', '9898749804', 'india', 'INR'
// -- );
// -- SELECT * FROM tbuser

// -- CREATE TABLE tbaccount (
// --     id SERIAL NOT NULL PRIMARY KEY,
// --     user_id INTEGER NOT NULL REFERENCES tbuser(id),
// --     account_name VARCHAR(50) NOT NULL,
// --     account_number VARCHAR(50) NOT NULL,
// --     account_balance NUMERIC (10,2) NOT NULL,
// --     createdAt TIMESTAMP NOT NULl DEFAULT CURRENT_TIMESTAMP,
// --     updatedAt TIMESTAMP NOT NULl DEFAULT CURRENT_TIMESTAMP
// -- );
// -- SELECT * FROM tbaccount

// CREATE TABLE tbtransaction (
//     id SERIAL NOT NULL PRIMARY KEY,
//     user_id INTEGER NOT NULL REFERENCES tbuser(id),
//     account_id INTEGER NOT NULL REFERENCES tbaccount(id),
//     description TEXT NOT NULL,
//     status VARCHAR(10) NOT NULL DEFAULT 'pending',
//     source VARCHAR(100)  NOT NULL,
// 	ammount NUMERIC (10,2) NOT NULL,
//     type VARCHAR (10) NOT NULL DEFAULT 'income',
//     createdAt TIMESTAMP NOT NULl DEFAULT CURRENT_TIMESTAMP,
//     updatedAt TIMESTAMP NOT NULl DEFAULT CURRENT_TIMESTAMP
// );
