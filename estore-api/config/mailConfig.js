const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error) => {
    if (error) {
        console.error("❌ Email configuration failed:", error.message);
    } else {
        console.log("✅ Email server is ready.");
    }
});

module.exports = transporter;