// Importing dependencies model
const { selectUserByIdModel } = require('../../models/users');

const getOwnUserController = async (req, res, next) => {
    try {
        // Obtaining new user data.
        const user = await selectUserByIdModel(req.user.id);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getOwnUserController;
