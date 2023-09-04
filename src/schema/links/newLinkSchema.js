const joi = require('joi');

// Modify the Joi error messages needed.
const joiErrorMessages = {
    'string.base': 'The value of "{#key}" must be a string',
    'any.required': 'The field "{#key}" is required',
    'string.empty': 'The field "{#key}" should not be empty',
    'number.base': 'The value of "{#key}" must be a number',
    'object.base': 'The value of "{#key}" must be an object',
    'any.only': 'Only jpeg or png photos are allowed',
    'string.min': 'The field "{#key}" must have at least {#limit} characters',
    'string.max': 'The field "{#key}" must not exceed {#limit} characters',
    'object.unknown': 'No additional fields are allowed on this object',
};


// We create Joi's schema where we check all the necessary properties.
const newLinkSchema = joi.object({
    title: joi.string().min(5).max(200).required().messages(joiErrorMessages),
    url: joi.string().min(3).max(300).required().messages(joiErrorMessages),
    description: joi
        .string()
        .min(10)
        .max(500)
        .required()
        .messages(joiErrorMessages),
});

module.exports = newLinkSchema;
