// Import the function that returns a database connection.
const getDb = require('../../db/getDb');

// Function that performs a database query to update a user's avatar.
const updateUserAvatarModel = async (avatarName, userId) => {
    let connection;

    try {
        connection = await getDb();

        await connection.query(`UPDATE users SET avatar = ? WHERE id = ?`, [
            avatarName,
            userId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserAvatarModel;
