const { updateUserPassModel } = require('../../models/users');

const editUserPassController = async (req, res, next) => {
    try {
        const { oldPass, newPass } = req.body;

        await updateUserPassModel(oldPass, newPass, req.user.id);

        res.send({
            status: 'ok',
            message: 'Password updated',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserPassController;
