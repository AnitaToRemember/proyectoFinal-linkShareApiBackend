module.exports = {
    cannotVoteYourOwnLinkError() {
        throw {
            httpStatus: 403, // Forbidden
            code: 'CANNOT_VOTE_OWN_LINK',
            message: `You can't vote for your own link`,
        };
    },

    cannotDeleteOtherUserLinkError() {
        throw {
            httpStatus: 401, // Forbidden
            code: 'CANNOT_DELETE_OTHER_USER_LINK',
            message: `You can't delete a link posted that is not yours`,
        };
    },
    
    emailAlreadyRegistered() {
        throw {
            httpStatus: 401,// Unauthorized
            code: 'INVALID_CREDENTIALS',
            message:'The email is already registered'
        }
    },

    invalidCredentialsError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid credentials',
        };
    },
    
    missingFieldsError() {
        throw {
            httpStatus: 400, // bad request
            code: 'MISSING FIELDS',
            message: 'Missing fields',
        };
    },

    notAuthenticatedError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'NOT_AUTHENTICATED',
            message: `You must send a token in the header 'Authorization'`,
        };
    },

    notFoundError(resource) {
        throw {
            httpStatus: 404, // Not Found
            code: 'RESOURCE_NOT_FOUND',
            message: `The required resource '${resource}' does not exist`,
        };
    },

    recoveryNotMatchError() {
        throw {
            httpStatus: 500, // Internal server error
            code: 'RECOVERY_PASS_NOT_MATCH',
            message: 'El código de recuperación no es valido',
        };
    },

    saveFileError() {
        throw {
            httpStatus: 500, // Internal Server Error
            code: 'FILE_SAVE_FAILED',
            message: 'Error al guardar el archivo en el disco',
        };
    },

    sendEmailError() {
        throw {
            httpStatus: 500, // Internal server error
            code: 'SEND_EMAIL_FAILED',
            message: 'Error al enviar email',
        };
    },

    userWithUserNameAlreadyExitsError() {
        throw {
            httpStatus: 401, // Unauthorized
            code: 'INVALID_CREDENTIALS',
            message:'There is already a user with this username'
        }
    },


    voteAlreadyExistsError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'vote_ALREADY_EXISTS',
            message: 'You cannot vote more than once for the same link.',
        };
    }
};