const Joi = require('joi');

const loginUserSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } })
        .required()
        .messages(),
    password: Joi.string()
        .required()
         .messages()
});

module.exports = loginUserSchema;