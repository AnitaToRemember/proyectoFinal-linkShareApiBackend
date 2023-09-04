const Joi = require('joi');

const registerUserSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } })
        .required()
        .messages(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .messages(),
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages(),
});

module.exports = registerUserSchema;