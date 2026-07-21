import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    register,
    login,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    getMe,
} from "../../api/authApi";

// Register
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await register(userData);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: "Registration failed.",
                }
            );
        }
    }
);

// Verify OTP
export const verifyUserOtp = createAsyncThunk(
    "auth/verifyOtp",
    async (otpData, { rejectWithValue }) => {
        try {
            const { data } = await verifyOtp(otpData);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: "OTP verification failed.",
                }
            );
        }
    }
);

// Login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await login(credentials);

            // Save token
            localStorage.setItem("token", data.token);

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: "Login failed.",
                }
            );
        }
    }
);

// Get Logged In User
export const fetchCurrentUser = createAsyncThunk(
    "auth/getMe",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getMe();
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: "Unable to fetch user.",
                }
            );
        }
    }
);

// Resend OTP
export const resendUserOtp = createAsyncThunk(
    "auth/resendOtp",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await resendOtp(payload);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: "Failed to resend OTP.",
                }
            );
        }
    }
);

// Forgot Password
export const forgotUserPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await forgotPassword(payload);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: "Failed to send reset OTP.",
                }
            );
        }
    }
);

// Reset Password
export const resetUserPassword = createAsyncThunk(
    "auth/resetPassword",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await resetPassword(payload);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || {
                    message: "Password reset failed.",
                }
            );
        }
    }
);