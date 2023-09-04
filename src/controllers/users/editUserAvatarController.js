// Import models.
const selectUserByIdModel = require('../../models/users/selectUserByIdModel');
const updateUserAvatarModel = require('../../models/users/updateUserAvatarModel');

// Import services.
const savePhotoService = require('../../services/savePhotoService');
const deletePhotoService = require('../../services/deletePhotoService');

// Import services.
const validateSchemaService = require('../../services/validateSchemaService');

// Import schema.
const { editUserAvatarSchema } = require('../../schema/users');

const editUserAvatarController = async (req, res, next) => {
    try {
        // Validate the body using Joi. If "files" don't exist, send an empty object.
        await validateSchemaService(editUserAvatarSchema, req.files || {});

        // Get user data to check if they already have a previous avatar.
        const user = await selectUserByIdModel(req.user.id);

        // If the user has a previous avatar, delete it.
        if (user.avatar) {
            await deletePhotoService(user.avatar);
        }

        // Save the avatar in the file upload directory. Resize to a width of 100 pixels.
        console.log(req.files.avatar);
        const avatarName = await savePhotoService(req.files.avatar, 100);

        // Update user data with the obtained avatar name.
        await updateUserAvatarModel(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'User updated',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserAvatarController;

