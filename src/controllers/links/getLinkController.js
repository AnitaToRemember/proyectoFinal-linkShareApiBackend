// Importing models
const selectLinkPostByIdModel = require('../../models/links/selectLinkPostByIdModel');

// Final controller function that returns an link posted with a given id.
const getLinkController = async (req, res, next) => {
    try {
        // We get the id of the link.
        const { linkId } = req.params;

        // Since we want to allow a non-logged in user to access this controller,
         // there will be times when "req.user" does not exist. With the question mark we indicate
         // to JavaScript that "user" can be undefined.
        const link = await selectLinkPostByIdModel(linkId, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                link,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getLinkController;
