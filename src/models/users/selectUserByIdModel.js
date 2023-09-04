const getDb = require('../../db/getDb');

const selectUserByIdModel = async (userId) => {
    let connection;

    try {
        connection = await getDb();

        const [users] = await connection.query(
            `SELECT id, username, email, avatar, role, createdAt, modifiedAt FROM users WHERE id = ?`,
            [userId]
        );

        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdModel;
