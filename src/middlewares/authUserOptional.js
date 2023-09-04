// Importing dependencies
const jwt = require('jsonwebtoken');

// Importing errors
const { invalidCredentialsError } = require('../services/errorService');

// Intermediate controller function that decrypts the token and creates the "req.user" property.
// If there is no token it does NOT throw an error.
const authUserOptional = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (authorization) {
            // Variable that will store the token info.
            let tokenInfo;

            try {
                tokenInfo = jwt.verify(authorization, process.env.SECRET);
            } catch (err) {
                console.log(err);
                invalidCredentialsError();
            }

            // If we have reached this point it means that the token has already been decrypted.
             // Create the "user" property on the "request" object (it's a made-up property).
            req.user = tokenInfo;
        }

        // We pass control to the next controller function.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUserOptional;
