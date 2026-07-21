require("dotenv").config();

const sendEmail = require("./utils/sendEmail");

const test = async () => {
    try {
        await sendEmail(
            process.env.EMAIL_USER,
            "E-Store Test Email",
            `
                <h2>Welcome to E-Store 🚀</h2>
                <p>If you're reading this, your email configuration is working successfully.</p>
            `
        );

        console.log("✅ Email sent successfully.");
    } catch (error) {
        console.error("❌ Email Error:", error);
    }
};

test();