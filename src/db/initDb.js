// Read the ".env" file with "dotenv" and make all the variables from that file
// available in the current process's environment variables list.
require('dotenv').config();

const getDb = require('./getDb');

const main = async () => {
    // Variable to hold a connection with the database.
    let connection;

    try {
        connection = await getDb();

        console.log('Deleting tables...');


        await connection.query(
            'DROP TABLE IF EXISTS votes, links, photos, users'
        );

        console.log('Creating tables...');

        // Create the users table.
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                recoverPassCode CHAR(10),
                role ENUM('admin', 'anonymous', 'normal') DEFAULT 'normal',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);


                // Create the links table.
        await connection.query(`
            CREATE TABLE IF NOT EXISTS links (
                id CHAR(36) PRIMARY KEY NOT NULL,
                title VARCHAR(200) NOT NULL,
                url VARCHAR(200) NOT NULL,
                description TEXT NOT NULL,
                userId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                FOREIGN KEY (userId) REFERENCES users(id)
                )
            `);


          // Create the photos table.
        await connection.query(`
			CREATE TABLE IF NOT EXISTS photos (
				id CHAR(36) PRIMARY KEY NOT NULL,
				name VARCHAR(100) NOT NULL,
				linkId CHAR(36) NOT NULL,
				FOREIGN KEY (linkId) REFERENCES links(id),
				createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`);
    

        // Create the votes table.
        await connection.query(`
            CREATE TABLE IF NOT EXISTS votes (
                id CHAR(36) PRIMARY KEY NOT NULL,
                value TINYINT UNSIGNED NOT NULL,
                userId CHAR(36) NOT NULL,
                linkId CHAR(36) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (linkId) REFERENCES links(id)
            )
        `);

        console.log('Tables created!');
    } catch (err) {
        console.error(err);
    } finally {
        // If there is a connection, release it.
        if (connection) connection.release();

        // Close the process.
        process.exit();
    }
};

// Execute the above function.
main();
