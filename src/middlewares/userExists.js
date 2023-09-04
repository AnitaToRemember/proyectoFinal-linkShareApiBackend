const getDb = require('../db/getDb');

const { notFoundError } = require('../services/errorService');

const userExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        const userId = req.user?.id;

        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ?`,
            [userId]
        );

        if (users.length < 1) {
            notFoundError('user');
        }

        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userExists;
