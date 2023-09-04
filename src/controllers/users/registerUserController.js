//importing dependecies
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// importing model fuction to be able to access the user in the db
const { User } = require('../../models/users');

//importing function to encrypt passwords
const getJwtToken = require('../../helpers/jwt-generator');

//importing database
const getDb = require('../../db/getDb');

//importing errors
const { emailAlreadyRegistered } = require('../../services/errorService');
const { userWithUserNameAlreadyExitsError } = require('../../services/errorService');
const validateSchemaService = require('../../services/validateSchemaService');
const { registerUserSchema }= require('../../schema/users');

// Final controller function that adds a user
const registerUserController = async (req, res, next) => {
    let connection;
    try {
        connection = await getDb();

        const { email, password, userName } = req.body;
        // Validations
        await validateSchemaService(registerUserSchema, req.body, next);

        const id = uuidv4();
        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User(id, email, hashedPass, userName);

        // Check if the email doesn't exist in the database, and if it does, throw an error.
        let [users] = await connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );

        if (users.length > 0) {
            emailAlreadyRegistered();
        }
        // Check if the userName doesn't exist in the database, and if it does, throw an error.
        [users] = await connection.query(
            `SELECT * FROM users WHERE username = ?`,
            [userName]
        )
            if (users.length > 0) {
                userWithUserNameAlreadyExitsError();
            }

        await connection.beginTransaction();

        await connection.query(
            `INSERT INTO users(id, username, email, password) VALUES(?, ?, ?, ?)`,
            [user.id, user.userName, user.email, user.password]
        );

        await connection.commit();
        
        res.status(201).json({
            id: user.id,
            email: user.email, 
            userName: user.userName,
            token: getJwtToken(id)
        });

    } catch (err) {
        
        await connection.rollback();

        next(err); 
    } finally {
        if (connection) connection.release();
    }
}

module.exports = registerUserController;
