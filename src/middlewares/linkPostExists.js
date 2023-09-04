// Import the function that returns a database connection.
const getDb = require('../db/getDb');

// Import errors.
const { notFoundError } = require('../services/errorService');

// Check if the posted link exists.
const linkPostExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();

        // Get the id from the path params.
        const { linkId } = req.params;

        const [links] = await connection.query(
            `SELECT id FROM links WHERE id = ?`,
            [linkId]
        );

        // Send an error if the link posted doesn't exist.
        if (links.length < 1) {
            notFoundError('link');
        }

        // Pass control to the next controller function.
        next();

    } catch (err) {
        next(err);

    } finally {
        if (connection) connection.release();
    }
};

module.exports = linkPostExists;
