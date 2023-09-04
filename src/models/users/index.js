
const User = require('./user');
const selectUserByIdModel = require("./selectUserByIdModel");
const updateUserPassModel = require("./updateUserPassModel");
const updateRecoveryPassCodeModel = require('./updateRecoveryPassModel');
const updatePasswordWithCodeModel = require('./updatePasswordWithCodeModel');
const updateUserAvatarModel = require('./updateUserAvatarModel');

module.exports = {
    User,
    selectUserByIdModel,
    updateUserPassModel,
    updateRecoveryPassCodeModel,
    updatePasswordWithCodeModel,
    updateUserAvatarModel,
}