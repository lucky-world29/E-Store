const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const Otp = require("../models/Otp");
const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");

// ==========================================================
// @desc    Register User
// @route   POST /api/auth/register
// @access  Public
// ==========================================================
const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            phone,
        } = req.body;

        // Validation
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !phone
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }

        // Normalize Email
        const normalizedEmail = email.toLowerCase().trim();

        // Check Existing User
        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists.",
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = await User.create({
            firstName,
            lastName,
            email: normalizedEmail,
            password: hashedPassword,
            phone,
        });

        // Generate OTP
        const otp = generateOtp();

        // Remove previous verification OTP
        await Otp.deleteMany({
            userId: user._id,
            purpose: "verify-email",
        });

        // OTP expires in 10 minutes
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Save OTP
        await Otp.create({
            userId: user._id,
            email: user.email,
            otp,
            purpose: "verify-email",
            expiresAt,
        });

        // Email Subject
        const subject = "Verify Your Email - E-Store";

        // Email Body
        const html = `
<div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">

<h2 style="color:#0d6efd;">Welcome to E-Store</h2>

<p>Hi <strong>${user.firstName}</strong>,</p>

<p>Thank you for registering with <strong>E-Store</strong>.</p>

<p>Your email verification OTP is:</p>

<div style="
font-size:32px;
font-weight:bold;
letter-spacing:8px;
text-align:center;
background:#f8f9fa;
padding:20px;
border-radius:8px;
margin:20px 0;
">
${otp}
</div>

<p>This OTP will expire in <strong>10 minutes</strong>.</p>

<p>If you didn't request this email, please ignore it.</p>

<hr>

<p style="font-size:12px;color:#777;">
© ${new Date().getFullYear()} E-Store. All Rights Reserved.
</p>

</div>
`;

        await sendEmail(user.email, subject, html);

        return res.status(201).json({
            success: true,
            message: "Registration successful. Please verify your email.",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

// ==========================================================
// @desc    Verify Email OTP
// @route   POST /api/auth/verify-otp
// @access  Public
// ==========================================================
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Validation
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required.",
            });
        }

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Find User
        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Already Verified
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified.",
            });
        }

        // Find OTP
        const otpRecord = await Otp.findOne({
            userId: user._id,
            email: normalizedEmail,
            purpose: "verify-email",
        });

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP.",
            });
        }

        // Check Expiry
        if (otpRecord.expiresAt < new Date()) {
            await Otp.deleteOne({ _id: otpRecord._id });

            return res.status(400).json({
                success: false,
                message: "OTP has expired.",
            });
        }

        // Compare OTP
        if (otpRecord.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP.",
            });
        }

        // Verify User
        user.isVerified = true;
        await user.save();

        // Delete OTP
        await Otp.deleteOne({
            _id: otpRecord._id,
        });

        return res.status(200).json({
            success: true,
            message: "Email verified successfully.",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

// ==========================================================
// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
// ==========================================================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Find User
        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // Check Blocked
        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message: "Your account has been blocked.",
            });
        }
        // Check Email Verification
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email before logging in.",
            });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // Generate Token
        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                isVerified: user.isVerified,
                isBlocked: user.isBlocked,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

// ==========================================================
// @desc    Get Logged In User
// @route   GET /api/auth/me
// @access  Private
// ==========================================================
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select(
            "-password"
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

// ==========================================================
// @desc    Resend Email Verification OTP
// @route   POST /api/auth/resend-otp
// @access  Private
// ==========================================================
const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // Validation
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        // Normalize Email
        const normalizedEmail = email.toLowerCase().trim();

        // Find User
        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Check if already verified
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified.",
            });
        }

        // Next Step:
        // Generate OTP
        const otp = generateOtp();

        // Delete previous OTP {// Remove previous verification OTP (if any)}
        await Otp.deleteMany({
            userId: user._id,
            purpose: "verify-email",
        });

        // OTP expires in 10 minutes
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Save OTP
        // Save OTP
        await Otp.create({
            userId: user._id,
            email: user.email,
            otp,
            purpose: "verify-email",
            expiresAt,
        });

        // Send Email
        // Email Subject
        const subject = "Verify Your Email - E-Store";

        // Email Body
        const html = `
<div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">

    <h2 style="color:#0d6efd;">Welcome to E-Store</h2>

    <p>Hi <strong>${user.firstName}</strong>,</p>

    <p>Thank you for registering with <strong>E-Store</strong>.</p>

    <p>Your email verification OTP is:</p>

    <div style="
        font-size:32px;
        font-weight:bold;
        letter-spacing:8px;
        text-align:center;
        background:#f8f9fa;
        padding:20px;
        border-radius:8px;
        margin:20px 0;
    ">
        ${otp}
    </div>

    <p>This OTP will expire in <strong>10 minutes</strong>.</p>

    <p>If you didn't request this email, please ignore it.</p>

    <hr>

    <p style="font-size:12px;color:#777;">
        © ${new Date().getFullYear()} E-Store. All Rights Reserved.
    </p>

</div>
`;
        // Send verification email
        await sendEmail(user.email, subject, html);


        return res.status(200).json({
            success: true,
            message: "OTP resent  successfully.",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

// ==========================================================
// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
// ==========================================================
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validation
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }

        // Normalize Email
        const normalizedEmail = email.toLowerCase().trim();

        // Find User
        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Generate OTP
        const otp = generateOtp();

        // Remove previous forgot-password OTP
        await Otp.deleteMany({
            userId: user._id,
            purpose: "forgot-password",
        });

        // OTP expires in 10 minutes
        const expiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );

        // Save OTP
        await Otp.create({
            userId: user._id,
            email: user.email,
            otp,
            purpose: "forgot-password",
            expiresAt,
        });

        // Email Subject
        const subject = "Reset Your Password - E-Store";

        // Email Body
        const html = `
<div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">

    <h2 style="color:#dc3545;">
        Password Reset Request
    </h2>

    <p>Hi <strong>${user.firstName}</strong>,</p>

    <p>
        We received a request to reset your password.
    </p>

    <p>Your Password Reset OTP is:</p>

    <div style="
        font-size:32px;
        font-weight:bold;
        letter-spacing:8px;
        text-align:center;
        background:#f8f9fa;
        padding:20px;
        border-radius:8px;
        margin:20px 0;
    ">
        ${otp}
    </div>

    <p>
        This OTP is valid for
        <strong>10 minutes</strong>.
    </p>

    <p>
        If you didn't request a password reset,
        please ignore this email.
    </p>

    <hr>

    <p style="font-size:12px;color:#777;">
        © ${new Date().getFullYear()} E-Store. All Rights Reserved.
    </p>

</div>
`;

        // Send Email
        await sendEmail(user.email, subject, html);

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent successfully.",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

// ==========================================================
// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
// ==========================================================
const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        // Validation
        if (!email || !otp || !password) {
            return res.status(400).json({
                success: false,
                message: "Email, OTP and new password are required.",
            });
        }

        // Normalize Email
        const normalizedEmail = email.toLowerCase().trim();

        // Find User
        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Find Forgot Password OTP
        const otpRecord = await Otp.findOne({
            userId: user._id,
            email: normalizedEmail,
            purpose: "forgot-password",
        });

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP.",
            });
        }

        // Check Expiry
        if (otpRecord.expiresAt < new Date()) {

            await Otp.deleteOne({
                _id: otpRecord._id,
            });

            return res.status(400).json({
                success: false,
                message: "OTP has expired.",
            });
        }

        // Compare OTP
        if (otpRecord.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP.",
            });
        }

        // Hash New Password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Update Password
        user.password = hashedPassword;

        await user.save();

        // Delete OTP
        await Otp.deleteOne({
            _id: otpRecord._id,
        });

        return res.status(200).json({
            success: true,
            message: "Password reset successfully.",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};


module.exports = {
    registerUser,
    verifyOtp,
    loginUser,
    getMe,
    resendOtp,
    forgotPassword,
    resetPassword,
};
