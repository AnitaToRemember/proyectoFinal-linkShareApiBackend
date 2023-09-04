const getDb = require('../../db/getDb');

const validateSchemaService = require('../../services/validateSchemaService');
const { recoverPassSchema } = require('../../schema/users');
const { invalidCredentialsError } = require('../../services/errorService');

const updateRecoveryPassCodeModel = async (email, recoverPassCode, next) => {
    let connection;

    try {
        connection = await getDb();
        await validateSchemaService(recoverPassSchema, { email }, next);
        
        const [users] = await connection.query(
            `SELECT email FROM users WHERE email = ?`,
            [email]
        );

        email = users[0].email;

        if (!email) {
            invalidCredentialsError();
        }
      
        await connection.query(`UPDATE users SET recoverPassCode = ? WHERE email = ?`, [
            recoverPassCode,
            email,
        ]);
    } catch (err) {
        
        await connection.rollback();

        next(err); 
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateRecoveryPassCodeModel;
