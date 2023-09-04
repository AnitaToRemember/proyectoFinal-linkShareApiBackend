const registerUserSchema = require('./registerUserSchema');
const loginUserSchema = require('./loginUserSchema');
const recoverPassSchema = require('./recoverPassSchema');
const updatePasswordWithCodeSchema = require('./updatePasswordWithCodeSchema');
const editUserAvatarSchema = require('./editUserAvatarSchema');

module.exports = {
    registerUserSchema,
    loginUserSchema,
    recoverPassSchema,
    updatePasswordWithCodeSchema,
    editUserAvatarSchema,
};