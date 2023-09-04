const Joi = require('joi');

const recoverPassSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } })
        .required()
        .messages()
});

module.exports = recoverPassSchema;