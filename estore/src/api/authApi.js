import api from "./axios";

// Register
export const register = (data) => {
    return api.post("/auth/register", data);
};

// Login
export const login = (data) => {
    return api.post("/auth/login", data);
};

// Verify Email OTP
export const verifyOtp = (data) => {
    return api.post("/auth/verify-otp", data);
};

// Resend Verification OTP
export const resendOtp = (data) => {
    return api.post("/auth/resend-otp", data);
};

// Forgot Password
export const forgotPassword = (data) => {
    return api.post("/auth/forgot-password", data);
};

// Reset Password
export const resetPassword = (data) => {
    return api.post("/auth/reset-password", data);
};

// Current Logged-in User
export const getMe = () => {
    return api.get("/auth/me");
};

// Check Email Availability
export const checkEmail = (email) => {
    return api.post("/auth/check-email", { email });
};