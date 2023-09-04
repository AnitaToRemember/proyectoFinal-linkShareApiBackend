// Importing the model
const insertLinkModel = require('../../models/links/insertLinkModel');

//Importing errors
const { missingFieldsError } = require('../../services/errorService');

//importing services
const validateSchemaService = require('../../services/validateSchemaService');

//importing schema
const newLinkSchema = require ('../../schema/links/newLinkSchema')

// Controller function that controls a new link posted 
const newLinkController = async (req, res, next) => {
    try {
        const { id, title, url, description } = req.body;

        // We validate the bodysuit with Joi
        await validateSchemaService(
            newLinkSchema,
            Object.assign(req.body)
            );

        if(!title || !url || !description ) {
            throw new  missingFieldsError();
            
        }

        // Inserting the new link post in the db and we get the assigned ID
        const linkId = await insertLinkModel(
            id,
            title,
            url,
            description,
            req.user.id
        );

        res.send({
            status: 'ok',
            data: {
                link: {
                    id: linkId,
                    title,
                    url,
                    description,
                    userId: req.user.id,
                    createdAt: new Date(),
                },
            },
        });

    } catch (err) {
        next(err);
    }
};

module.exports = newLinkController;
