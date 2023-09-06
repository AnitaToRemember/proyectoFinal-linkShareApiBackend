const getDb = require('../../db/getDb');
const bcrypt = require('bcrypt');
const validateSchemaService = require('../../services/validateSchemaService');
const { updatePasswordWithCodeSchema } = require('../../schema/users');
const { recoveryNotMatchError, invalidCredentialsError } = require('../../services/errorService');

const updatePasswordWithCodeModel = async (email, code, password, next) => { 
    let connection;
    
    try {

        connection = await getDb();
        await validateSchemaService(updatePasswordWithCodeSchema, { email, password }, next);
        
        const [users] = await connection.query(
            `SELECT recoverPassCode FROM users WHERE email = ?`,
            [email]
        );
        
        if (users.length === 0) {
            invalidCredentialsError();
        }

        const recoverPassCode = users[0].recoverPassCode
    
        if (!recoverPassCode || recoverPassCode !== code) {
            recoveryNotMatchError();
        }

        const hashedPass = await bcrypt.hash(password, 10);
        await connection.query(`UPDATE users SET password = ?, recoverPassCode = ? WHERE email = ?`, [
            hashedPass,
            null,
            email
        ]);
    } finally {
        if (connection) connection.release();
    }
}

module.exports = updatePasswordWithCodeModel;