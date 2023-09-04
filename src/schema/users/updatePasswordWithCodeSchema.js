const Joi = require('joi');

const updatePasswordWithCodeSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } })
        .required()
        .messages(),
        password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .messages(),
});

module.exports = updatePasswordWithCodeSchema;