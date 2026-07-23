import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, resetPassword } from "../../api/authApi";
import "./_forgotPassword.scss";

const ForgotPassword = () => {
    const [showResetSection, setShowResetSection] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!formData.email.trim()) {
            toast.warning("Please enter your email.");
            return;
        }

        try {
            const response = await forgotPassword({
                email: formData.email,
            });

            toast.success(response.data.message);
            setShowResetSection(true);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong.");
            }
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!formData.otp || !formData.password || !formData.confirmPassword) {
            toast.warning("Please fill all fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await resetPassword({
                email: formData.email,
                otp: formData.otp,
                password: formData.password,
            });

            toast.success(response.data.message);

            setFormData({
                email: "",
                otp: "",
                password: "",
                confirmPassword: "",
            });

            setShowResetSection(false);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong.");
            }
        }
    };

    return (
        <div className="forgot-page">
            {/* <div className="forgot-left">
                <div className="forgot-brand">
                    <span className="forgot-badge">
                        <i className="fa-solid fa-wand-magic-sparkles" />
                        Account Recovery
                    </span>

                    <h1>eStore</h1>

                    <p>
                        Reset your password in a simple, secure, and guided flow.
                        We will verify your email, send an OTP, and help you create
                        a new password.
                    </p>
                </div>

                <div className="forgot-highlight">
                    <div>
                        <i className="fa fa-envelope" />
                        Email verification
                    </div>

                    <div>
                        <i className="fa fa-shield-alt" />
                        Secure OTP
                    </div>

                    <div>
                        <i className="fa fa-lock" />
                        New password
                    </div>
                </div>
            </div> */}

            <div className="forgot-right">
                <div className="forgot-card">
                    <div className="forgot-card-top">
                        <span className="forgot-pill">
                            <i className="fa-solid fa-sparkles" />
                            Password Recovery
                        </span>

                        <h2>Forgot Password</h2>
                        <p>
                            Enter your registered email address to receive a verification code.
                        </p>
                    </div>

                    <form className="forgot-form" onSubmit={handleSendOtp}>
                        <div className="field">
                            <label>Email</label>
                            <div className="input-wrap">
                                <i className="fa fa-envelope" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="forgot-btn primary"
                        >
                            Send OTP
                        </button>
                    </form>

                    {showResetSection && (
                        <form className="reset-section" onSubmit={handleResetPassword}>
                            <div className="reset-title">
                                <span>Step 2</span>
                                <h3>Verify OTP and set a new password</h3>
                            </div>

                            <div className="field">
                                <label>OTP</label>
                                <div className="input-wrap">
                                    <i className="fa fa-key" />
                                    <input
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        placeholder="Enter OTP"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label>New Password</label>
                                <div className="input-wrap">
                                    <i className="fa fa-lock" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="New Password"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label>Confirm Password</label>
                                <div className="input-wrap">
                                    <i className="fa fa-lock" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="forgot-btn secondary"
                            >
                                Reset Password
                            </button>
                        </form>
                    )}

                    <div className="forgot-bottom">
                        <span>Remember your password?</span>
                        <Link to="/login">Back to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;