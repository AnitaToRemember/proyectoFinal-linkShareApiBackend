const { deteleLinkPostByIdModel } = require("../../models/links");
const selectLinkPostByIdModel = require("../../models/links/selectLinkPostByIdModel");
const { cannotDeleteOtherUserLinkError } = require("../../services/errorService");


    const deteleLinkByIdController = async (req, res, next) => {
        try {
        const { linkId } = req.params;
    
        const link = await selectLinkPostByIdModel(linkId);
    
        if (req.user.id !== link.userId) {
            cannotDeleteOtherUserLinkError();
        }
    
        await deteleLinkPostByIdModel(linkId);

        res.send({
            status: 'ok',
            message: `the link post with id: ${linkId} has been erased`,
        });
        } catch (err) {
        next(err);
        }
    };
    
    module.exports = deteleLinkByIdController;
