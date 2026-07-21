import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/Auth/actions";
import { clearAuthState } from "../../Redux/Auth/authSlice";
import "./_register.scss";
import { toast } from "react-toastify";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, success, error, message } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            confirmPassword,
        } = formData;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword
        ) {
            toast.warning("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        const result = await dispatch(
            registerUser({
                firstName,
                lastName,
                email,
                phone,
                password,
            })
        );

        if (registerUser.fulfilled.match(result)) {
            navigate("/verify-otp", {
                state: { email },
            });
        }
    };

    useEffect(() => {
        if (success && message) {
            toast.success(message);
            dispatch(clearAuthState());
        }

        if (error) {
            toast.error(error);
            dispatch(clearAuthState());
        }
    }, [success, error, message, dispatch]);

    return (
        <div className="register-page">
            <div className="register-left">
                <div className="register-brand">
                    <h1>eStore</h1>
                    <p>
                        Create your account and enjoy a smoother shopping
                        experience with order tracking and saved carts.
                    </p>
                </div>

                <div className="register-highlight">
                    <div>
                        <i className="fa fa-shopping-cart" /> Save your cart
                    </div>

                    <div>
                        <i className="fa fa-bolt" /> Faster checkout
                    </div>

                    <div>
                        <i className="fa fa-user" /> Order history
                    </div>
                </div>
            </div>

            <div className="register-right">
                <div className="register-card">
                    <span className="register-pill">Create account</span>

                    <h2>Register</h2>

                    <p>Fill in your details to get started.</p>

                    <form className="register-form" onSubmit={handleRegister}>
                        <div className="field">
                            <label>First Name</label>
                            <div className="input-wrap">
                                <i className="fa fa-user" />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label>Last Name</label>
                            <div className="input-wrap">
                                <i className="fa fa-user" />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>

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
                            <label>Phone</label>
                            <div className="input-wrap">
                                <i className="fa fa-phone" />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
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
                                    placeholder="Create password"
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
                                    placeholder="Confirm password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="register-btn"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <div className="register-bottom">
                        <span>Already have an account?</span>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;