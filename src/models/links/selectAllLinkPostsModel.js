// Importing the function that returns a connection to the database.
const getDb = require('../../db/getDb');

// Function that performs a query to the database to obtain the list of links posted.
const selectAllLinkPostsModel = async (keyword = '', userId = '',  sortBy = 'date') => {
    let connection;

    try {
        connection = await getDb();

        // Determine the ORDER BY clause based on the sortBy parameter
        const orderByClause = sortBy === 'votes' ? 'ORDER BY votes DESC' : 'ORDER BY L.createdAt DESC';

        // Get the list of links posted.
        const [links] = await connection.query(
            `SELECT 
                L.id,
                L.title,
                L.url, 
                U.username,
                BIT_OR(V.userId = ?) AS votedByMe, 
                L.userId = ? AS owner,
                AVG(IFNULL(V.value, 0)) AS votes,
                L.createdAt
            FROM links L
            LEFT JOIN votes V ON V.linkId = L.id
            INNER JOIN users U ON U.id = L.userId
            WHERE L.title LIKE ? OR L.url LIKE ? OR L.description LIKE ?
            GROUP BY L.id
            ${orderByClause}
    `,
    [userId, userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
        );

            return links;

    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllLinkPostsModel;
