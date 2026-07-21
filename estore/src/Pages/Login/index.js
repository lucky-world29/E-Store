import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../api/authApi";
import "./_login.scss";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {

        if (!formData.email || !formData.password) {
            toast.warning("Please enter your email and password.");
            return;
        }

        try {

            const response = await login({
                email: formData.email,
                password: formData.password
            });

            // Save JWT Token
            localStorage.setItem("token", response.data.token);
            toast.success(response.data.message);
            console.log("Token:", response.data.token);
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {

            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong.");
            }

        }

    };

    return (
        <div className="login-page">

            <div className="login-left">
                <div className="login-brand">
                    <h1>eStore</h1>
                    <p>
                        Sign in to continue shopping, track your orders,
                        and keep your cart in sync.
                    </p>
                </div>

                <div className="login-highlight">
                    <div>
                        <i className="fa fa-lock" /> Secure access
                    </div>

                    <div>
                        <i className="fa fa-truck" /> Faster checkout
                    </div>

                    <div>
                        <i className="fa fa-heart" /> Wishlist saved
                    </div>
                </div>
            </div>

            <div className="login-right">

                <div className="login-card">

                    <span className="login-pill">
                        Welcome back
                    </span>

                    <h2>Login</h2>

                    <p>
                        Enter your email and password to continue.
                    </p>

                    <div className="login-form">

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

                        <div className="field">
                            <label>Password</label>

                            <div className="input-wrap">
                                <i className="fa fa-lock" />

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <div className="login-row">

                            <label className="remember">
                                <input type="checkbox" />
                                Remember me
                            </label>

                            <Link to="/forgot-password">
                                Forgot Password?
                            </Link>

                        </div>

                        <button
                            type="button"
                            className="login-btn"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                    </div>

                    <div className="login-bottom">
                        <span>New here?</span>

                        <Link to="/register">
                            Create account
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;