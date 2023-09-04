const validateSchemaService = async (schema, body, next) => {
    try {
        await schema.validateAsync(body);
    } catch (err) {
        err.httpStatus = 400; // Bad Request
        err.code = 'MISSING_FIELDS';
        throw err;
    }
};

module.exports = validateSchemaService;
