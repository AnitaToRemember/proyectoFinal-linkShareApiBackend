const bcrypt = require('bcrypt');

const getDb = require('../../db/getDb');

const { invalidCredentialsError } = require('../../services/errorService');

const updateUserPassModel = async (oldPass, newPass, userId) => {
    let connection;

    try {
        connection = await getDb();

        const [users] = await connection.query(
            `SELECT password FROM users WHERE id = ?`,
            [userId]
        );

        const validPass = await bcrypt.compare(oldPass, users[0].password);

        if (!validPass) {
            invalidCredentialsError();
        }

        const hashedPass = await bcrypt.hash(newPass, 10);

        await connection.query(`UPDATE users SET password = ? WHERE id = ?`, [
            hashedPass,
            userId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserPassModel;
