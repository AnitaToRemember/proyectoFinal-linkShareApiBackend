const randomstring = require('randomstring');

const { updateRecoveryPassCodeModel } = require('../../models/users');
const sendMailService = require('../../services/sendEmailService');

const sendRecoverPassController =  async(req, res, next) => {
    
    try {
        
        const recoverPassCode = randomstring.generate(10);
        const { email } = req.body;

        await updateRecoveryPassCodeModel(email, recoverPassCode, next);
        sendEmail(email, recoverPassCode, next);

        res.status(201).json({
            status:'ok',
            messages:'We have sent you an email. Please check your inbox.'
        });
    } catch (err) {
        next(err); 
    } 
}


const sendEmail = async(email, recoverPassCode, next) => {
    // We create the subject of the password recovery email.
    const emailSubject =
    'Password recovery in Link Share Api';

    // Create the email content
    const emailBody = `
    Password recovery has been requested for this email in Link Share Api. 
        
    Use the following code to create a new password: ${recoverPassCode}

    If it was not you, please ignore this email.
    `;
    await sendMailService(email, emailSubject, emailBody, next);
}

module.exports = sendRecoverPassController;