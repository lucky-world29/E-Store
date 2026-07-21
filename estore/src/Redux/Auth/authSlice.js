import { createSlice } from "@reduxjs/toolkit";
import {
    registerUser,
    verifyUserOtp,
    loginUser,
    fetchCurrentUser,
    resendUserOtp,
    forgotUserPassword,
    resetUserPassword,
} from "./actions";

const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    success: false,
    error: null,
    message: "",
    isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        clearAuthState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.message = "";
        },

        logout: (state) => {
            localStorage.removeItem("token");

            state.user = null;
            state.token = null;
            state.loading = false;
            state.success = false;
            state.error = null;
            state.message = "";
            state.isAuthenticated = false;
        },
    },

    extraReducers: (builder) => {

        // Register
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            });

        // Verify OTP
        builder
            .addCase(verifyUserOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyUserOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(verifyUserOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            });

        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.message = action.payload.message;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
                state.isAuthenticated = false;
            });

        // Get Me
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            });

        // Resend OTP
        builder
            .addCase(resendUserOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(resendUserOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(resendUserOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            });

        // Forgot Password
        builder
            .addCase(forgotUserPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgotUserPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(forgotUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            });

        // Reset Password
        builder
            .addCase(resetUserPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetUserPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(resetUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            });
    },
});

export const { clearAuthState, logout } = authSlice.actions;

export default authSlice.reducer;