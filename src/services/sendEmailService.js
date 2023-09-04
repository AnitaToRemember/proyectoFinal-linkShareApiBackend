const nodemailer = require('nodemailer');

const { sendEmailError } = require('./errorService');

const { SMTP_SERVICE, SMTP_USER, SMTP_PASS } = process.env;

const transport = nodemailer.createTransport({
    service: SMTP_SERVICE,
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

const sendEmailService = async (email, subject, body, next) => {
    try {
        const mailOptions = {
            from: SMTP_USER,
            to: email,
            subject,
            text: body,
        };

        await transport.sendMail(mailOptions);
    } catch (err) {
        console.error(err);
        sendEmailError();
        next(err);
    }
};

module.exports = sendEmailService;