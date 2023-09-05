// Importing models
const selectAllLinkPostsModel = require('../../models/links/selectAllLinkPostsModel');

// Final controller function that returns the list of entries. Allows you to filter by keyword
const listLinksController = async (req, res, next) => {
    try {
        // Obtaining query param.
        const { keyword, sortBy } = req.query;

        // Since we want to allow a non-logged in user to access this controller,
         // there will be times when "req.user" does not exist. With the question mark we indicate
         // to JavaScript that "user" can be undefined.
        const links = await selectAllLinkPostsModel(keyword, req.user?.id, sortBy);

        res.send({
            status: 'ok',
            data: {
                links,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listLinksController;
