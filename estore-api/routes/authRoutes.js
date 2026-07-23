const express = require("express");

const {
    registerUser,
    verifyOtp,
    loginUser,
    checkEmail,
    getMe,
    resendOtp,
    forgotPassword,
    resetPassword,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================================
// Public Routes
// ==========================================================
router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/check-email", checkEmail);
// ==========================================================
// Private Routes
// ==========================================================
router.get("/me", protect, getMe);
// router.post("/resend-otp", protect, resendOtp);
router.post("/resend-otp", resendOtp);

module.exports = router;