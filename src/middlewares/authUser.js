// Importing dependencies model
const jwt = require('jsonwebtoken');

// Importing errors
const {
    notAuthenticatedError,
    invalidCredentialsError,
} = require('../services/errorService');

const authUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            notAuthenticatedError();
        }

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (err) {
            invalidCredentialsError();
        }

        // Adding info about the user in the req
        req.user = tokenInfo;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
