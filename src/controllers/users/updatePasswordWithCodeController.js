const { updatePasswordWithCodeModel } = require('../../models/users');

const updatePasswordWithCodeController =  async(req, res, next) => {
    
    try {
       const { email, code, password } = req.body
       await updatePasswordWithCodeModel(email, code, password,)
        res.status(201).json({
            email, code, password
        });
    } catch (err) {
        next(err); 
    } 
}

module.exports = updatePasswordWithCodeController;