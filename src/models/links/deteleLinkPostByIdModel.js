//Importing dependencies
const uuid = require('uuid');

//Importing database
const getDb = require('../../db/getDb');


const deteleLinkPostByIdModel = async (linkId) => {
    let connection;
  
    try {
      connection = await getDb();

      // First, we delete related records in the "votes" table
      await connection.query(
        `DELETE FROM votes WHERE linkId = ?`,
        [linkId]
    );

    // Then, we delete the link in the "links" table
      await connection.query(
        `DELETE FROM links WHERE id = ?`,
        [linkId]
      );
  
      return;

    } finally {
      if (connection) connection.release();
    }
  };

  module.exports = deteleLinkPostByIdModel;