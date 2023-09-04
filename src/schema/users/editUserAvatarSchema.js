const joi = require('joi');

// Modify the error messages of Joi as needed.
const joiErrorMessages = {
    'string.base': 'The value of "{#key}" should be a string',
    'any.required': 'The field "{#key}" is required',
    'string.empty': 'The field "{#key}" should not be empty',
    'number.base': 'The value of "{#key}" should be a number',
    'number.max': 'The file should not exceed 5 MB',
    'object.base': 'The value of "{#key}" should be an object',
    'any.only': 'Only jpeg or png photos are allowed',
};

// Create the Joi schema where we validate all the necessary properties.
const editUserAvatarSchema = joi.object({
    avatar: joi
        .object({
            name: joi.string().required().messages(joiErrorMessages),
            mimetype: joi
                .string()
                .valid('image/jpeg', 'image/png')
                .required()
                .messages(joiErrorMessages),
            size: joi
                .number()
                .max(5000000)
                .required()
                .messages(joiErrorMessages),
        })
        .unknown(true)
        .messages(joiErrorMessages),
});

module.exports = editUserAvatarSchema;

