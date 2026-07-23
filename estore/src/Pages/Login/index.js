import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../api/authApi";
import "./_login.scss";
import { validateLogin } from "../../Utils/validation";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the error for the current field
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleLogin = async () => {

        // Validate Login Form
        const validationErrors = validateLogin(formData);

        setErrors(validationErrors);

        // Stop if validation fails
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {

            setLoading(true);

            const response = await login({
                email: formData.email,
                password: formData.password,
            });

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            toast.success(response.data.message);

            console.log("Token:", response.data.token);

            setTimeout(() => {
                navigate("/");
            }, 1000);

        }
        catch (error) {

            if (error.response) {
                toast.error(error.response.data.message);
            }
            else {
                toast.error("Something went wrong.");
            }

        }
        finally {

            setLoading(false);

        }

    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">

                    <div className="login-brand">
                        <h1>eStore</h1>
                        <p>Premium Shopping Experience</p>
                    </div>

                    <span className="login-pill">
                        <i className="fa-solid fa-bag-shopping"></i>
                        eStore
                    </span>

                </div>

                <div className="login-content">

                    <h2>Welcome Back</h2>

                    <p>
                        Sign in to continue shopping and manage your orders.
                    </p>

                    <form
                        className="login-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                    >

                        {/* Email */}

                        <div className="field">

                            <label>Email</label>

                            <div
                                className={`input-wrap ${errors.email ? "error" : ""}`}
                            >
                                <i className="fa fa-envelope"></i>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />

                            </div>

                            {errors.email && (
                                <span className="error-text">
                                    {errors.email}
                                </span>
                            )}

                        </div>

                        {/* Password */}

                        <div className="field">

                            <label>Password</label>

                            <div
                                className={`input-wrap ${errors.password ? "error" : ""}`}
                            >
                                <i className="fa fa-lock"></i>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i
                                        className={`fa ${showPassword
                                                ? "fa-eye-slash"
                                                : "fa-eye"
                                            }`}
                                    ></i>
                                </button>

                            </div>

                            {errors.password && (
                                <span className="error-text">
                                    {errors.password}
                                </span>
                            )}

                        </div>

                        {/* Remember */}

                        <div className="login-row">

                            <label className="remember">
                                <input type="checkbox" />
                                Remember Me
                            </label>

                            <Link to="/forgot-password">
                                Forgot Password?
                            </Link>

                        </div>

                        {/* Button */}

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <i className="fa fa-spinner fa-spin"></i>
                                    {" "}Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>

                    </form>

                    <div className="login-bottom">

                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/register">
                            Create Account
                        </Link>

                    </div>

                </div>

            </div>
        </div >
    );
};

export default Login;