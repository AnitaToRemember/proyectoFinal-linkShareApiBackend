const { User } = require('../../models/users');
const getJwtToken = require('../../helpers/jwt-generator');
const getDb = require('../../db/getDb');
const loginUserSchema = require('../../schema/users/loginUserSchema');
const validateSchemaService = require('../../services/validateSchemaService');
const bcrypt = require('bcrypt');
const { invalidCredentialsError } = require('../../services/errorService');


const loginUserController = async (req, res, next) => {
    let connection;
    
    try {
        connection = await getDb();
        const { email, password } = req.body;
        await validateSchemaService(loginUserSchema, { email, password }, next);

        const [users] = await connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        
        if (users.length === 0) {
            invalidCredentialsError(); // User not exists in database
        }

        if (!bcrypt.compareSync(password, users[0].password)) { 
            invalidCredentialsError(); // passwords aren't equals
        } 

        const user = new User(users[0].id, users[0].email, users[0].password, users[0].username);

        res.status(201).json({
            id: user.id,
            email: user.email, 
            userName: user.userName,
            token: getJwtToken(user.id)
        });

    } catch (err) {
        
        await connection.rollback();

        next(err); 
    } finally {
        if (connection) connection.release();
    }

}

module.exports = loginUserController;