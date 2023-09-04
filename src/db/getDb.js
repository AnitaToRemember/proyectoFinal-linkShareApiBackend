const mysql = require('mysql2/promise');

// Accessing to the necessary environment variables through destructuring.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable that stores a group (array) of connections.
let pool;

// Function that will return one of the 10 available connections with the database.
const getDb = async () => {
    try {
        // If the "pool" variable is undefined...
        if (!pool) {
            // Establishing a connection with the database.
            const dbConnection = await mysql.createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
            });

            // With the previous connection, create the database if it doesn't exist.
            await dbConnection.query(
                `CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`
            );

            // Create a group of connections.
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        // Return a free connection to the database.
        return await pool.getConnection();
    } catch (err) {
        console.error(err);
    }
};

// Exporting the function.
module.exports = getDb;
