const joi = require('joi');

// Modify the error messages of Joi that we need.
const joiErrorMessages = {
    'any.required': 'The field "{#key}" is required',
    'number.base': 'The value of "{#key}" must be a number',
    'number.min': 'The value of "{#key}" must be greater than or equal to 1',
    'number.max': 'The value of "{#key}" must be less than equal to 5',
    'number.integer': 'The value of"{#key}" must be an integer',
};

// We create Joi's schema where we check all the necessary properties.
const voteLinkSchema = joi.object({
    value: joi
        .number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages(joiErrorMessages),
});

module.exports = voteLinkSchema;
