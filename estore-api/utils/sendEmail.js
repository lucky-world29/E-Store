const transporter = require("../config/mailConfig");

const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `"E-Store" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
};

module.exports = sendEmail;