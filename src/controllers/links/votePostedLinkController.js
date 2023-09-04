// Importing models
const insertLinkVoteModel = require("../../models/links/inserLinkVoteModel");
const selectLinkPostByIdModel = require("../../models/links/selectLinkPostByIdModel");

// Importing errors
const { cannotVoteYourOwnLinkError } = require("../../services/errorService");


// Importing schemas
const voteLinkSchema = require("../../schema/links/voteLinkSchema");

// Importing services
const validateSchemaService = require("../../services/validateSchemaService");

// Final controller function that allows liking on an link.
const votePostedLinkController = async (req, res, next) => {
    try {
        const { linkId } = req.params;
        const { value } = req.body;

        // Validate the body with Joi.
        await validateSchemaService(voteLinkSchema, req.body);

        // We get the post details.
        const link = await selectLinkPostByIdModel(linkId);

        // If we are the owners of the link we throw an error.
        if (link.userId === req.user.id){ 
            cannotVoteYourOwnLinkError();
        }

        // Insert the vote and obtain the new average.
        const votesAvg = await insertLinkVoteModel(value, linkId, req.user.id);

        res.send({
            status: 'ok',
            data: {
                votesAvg,
            },
        });

    } catch (err) {
        next(err);
    }
};

module.exports = votePostedLinkController;