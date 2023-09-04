//Importing dependencies
const uuid = require('uuid');

//Importing database
const getDb = require('../../db/getDb');

// Importing errors
const { voteAlreadyExistsError } = require('../../services/errorService');

//Function that checks the database to vote a link
const insertLinkVoteModel = async (value, linkId, userId) => 
{
    let connection;
    
    try {

        connection = await getDb();

        // We check if there is already a previous vote by the user who is trying vote the link

        const [votes] = await connection.query(
            `SELECT id FROM votes WHERE userId = ? AND linkId = ?`,
            [userId, linkId]
        );

        // If the length of the votes array is greater than zero we throw an error indicating
        // that the link has already been voted on by this user.
        if (votes.length > 0){
            voteAlreadyExistsError();
        }

        // Insert the vote
        await connection.query(
        `INSERT INTO votes(id, value, linkId, userId) VALUES (?, ?, ?, ?)`,
        [uuid.v4(), value, linkId, userId]
        );
        //Obtaining votes average
        const [votesAvg] = await connection.query(
            `SELECT AVG(value) AS avg FROM votes WHERE linkId =?`,
            [linkId]
        );
        
        // return a vote average
        return Number(votesAvg[0].avg);
        
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertLinkVoteModel;