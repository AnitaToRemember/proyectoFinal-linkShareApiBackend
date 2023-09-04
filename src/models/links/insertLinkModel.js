// importing dependencies
const { v4: uuidv4 } = require('uuid');

// importing database
const getDb = require('../../db/getDb');

// function that goes to the database to insert a new link
const insertLinkModel = async (id, title, url, description, userId) => {

    let connection;

    try {
        connection = await getDb();

        // generation linkId

        const linkId = uuidv4();

        const id = linkId;

        // create the link post
        const [link] = await connection.query(
            `INSERT INTO links(id, title, url, description, userId) VALUES(?, ?, ?, ?, ?)`,
            [id, title, url, description, userId]
        );

        // returning the id of the link
        return linkId;

    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertLinkModel;
