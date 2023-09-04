//Importing dependencies
const uuid = require('uuid');

//Importing database
const getDb = require('../../db/getDb');


const deteleLinkPostByIdModel = async (linkId) => {
    let connection;
  
    try {
      connection = await getDb();
  
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