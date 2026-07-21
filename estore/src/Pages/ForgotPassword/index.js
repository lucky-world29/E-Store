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
        confirmPassword: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSendOtp = async () => {

        if (!formData.email) {
            toast.warning("Please enter your email.");
            return;
        }

        try {

            const response = await forgotPassword({
                email: formData.email
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

    const handleResetPassword = async () => {

        if (
            !formData.otp ||
            !formData.password ||
            !formData.confirmPassword
        ) {
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
                password: formData.password
            });

            toast.success(response.data.message);

            setFormData({
                email: "",
                otp: "",
                password: "",
                confirmPassword: ""
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

            <div className="forgot-left">

                <div className="forgot-brand">
                    <h1>eStore</h1>

                    <p>
                        Recover your account securely using email verification
                        and create a new password in just a few steps.
                    </p>
                </div>

                <div className="forgot-highlight">

                    <div>
                        <i className="fa fa-envelope" />
                        Email Verification
                    </div>

                    <div>
                        <i className="fa fa-shield-alt" />
                        Secure OTP
                    </div>

                    <div>
                        <i className="fa fa-lock" />
                        Reset Password
                    </div>

                </div>

            </div>

            <div className="forgot-right">

                <div className="forgot-card">

                    <span className="forgot-pill">
                        Password Recovery
                    </span>

                    <h2>Forgot Password</h2>

                    <p>
                        Enter your registered email address to receive a
                        verification code.
                    </p>

                    <div className="forgot-form">

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
                            className="forgot-btn"
                            onClick={handleSendOtp}
                        >
                            Send OTP
                        </button>

                        {showResetSection && (

                            <div className="reset-section">

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
                                    type="button"
                                    className="forgot-btn"
                                    onClick={handleResetPassword}
                                >
                                    Reset Password
                                </button>

                            </div>

                        )}

                    </div>

                    <div className="forgot-bottom">

                        <span>Remember your password?</span>

                        <Link to="/login">
                            Back to Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ForgotPassword;