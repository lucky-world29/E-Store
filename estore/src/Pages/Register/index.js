import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/Auth/actions";
import { clearAuthState } from "../../Redux/Auth/authSlice";
import "./_register.scss";
import { validateRegister } from "../../Utils/validation";
import { checkEmail } from "../../api/authApi";
import { toast } from "react-toastify";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, success, error, message } = useSelector(
        (state) => state.auth
    );

    const [emailExists, setEmailExists] = useState(false);
    const [checkingEmail, setCheckingEmail] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // const handleChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let inputValue = value;

        // Allow only digits for phone
        if (name === "phone") {
            inputValue = value.replace(/\D/g, "").slice(0, 10);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: inputValue,
        }));

        // Clear error for the current field while typing
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const checkEmailExists = async () => {

        if (!formData.email.trim()) return;

        // Don't check if email validation already failed
        if (errors.email) return;

        try {

            setCheckingEmail(true);

            const response = await checkEmail(formData.email);
            console.log(response.data);
            setEmailExists(response.data.exists);

        } catch (error) {

            console.error(error);

        } finally {

            setCheckingEmail(false);

        }

    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate all fields
        const validationErrors = validateRegister(formData);

        // Show validation errors
        setErrors(validationErrors);

        // Stop if there are errors
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        // Call API
        const result = await dispatch(
            registerUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            })
        );

        // Success
        if (registerUser.fulfilled.match(result)) {
            navigate("/verify-otp", {
                state: {
                    email: formData.email,
                },
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
            <div className="register-card">
                <div className="register-header">
                    <div className="register-brand">
                        <h1>eStore</h1>
                        <p>Premium Shopping Experience</p>
                    </div>

                    <span className="register-pill">
                        <i className="fa-solid fa-bag-shopping"></i>
                        eStore
                    </span>
                </div>

                <div className="register-content">
                    <h2>Create Your Account</h2>
                    <p>Fill in your details to get started.</p>

                    <form className="register-form" onSubmit={handleRegister}>
                        <div className="form-row">
                            <div className="field">

                                <label>First Name</label>

                                <div
                                    className={`input-wrap ${errors.firstName ? "error" : ""
                                        }`}
                                >

                                    <i className="fa fa-user" />

                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="First name"
                                    />

                                </div>

                                {errors.firstName && (

                                    <span className="error-text">

                                        {errors.firstName}

                                    </span>

                                )}

                            </div>

                            <div className="field">

                                <label>Last Name</label>

                                <div
                                    className={`input-wrap ${errors.lastName ? "error" : ""
                                        }`}
                                >

                                    <i className="fa fa-user" />

                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last name"
                                    />

                                </div>

                                {errors.lastName && (

                                    <span className="error-text">

                                        {errors.lastName}

                                    </span>

                                )}

                            </div>
                        </div>

                        <div className="field">

                            <label>Email</label>

                            <div
                                className={`input-wrap ${errors.email ? "error" : ""
                                    } ${emailExists ? "warning" : ""
                                    }`}
                            >

                                <i className="fa fa-envelope"></i>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={checkEmailExists}
                                    placeholder="Enter your email"
                                />

                            </div>

                            {errors.email && (
                                <span className="error-text">
                                    {errors.email}
                                </span>
                            )}

                            {checkingEmail && (
                                <span className="checking-email">
                                    Checking email...
                                </span>
                            )}

                            {!checkingEmail && !errors.email && emailExists && (
                                <div className="email-warning">

                                    <div className="warning-message">
                                        <i className="fa-solid fa-circle-exclamation"></i>
                                        <span>This email is already registered.</span>
                                    </div>

                                    <div className="warning-action">
                                        <span>Already have an account?</span>

                                        <Link to="/login">
                                            Login →
                                        </Link>
                                    </div>

                                </div>
                            )}

                        </div>

                        <div className="field">

                            <label>Phone</label>

                            <div
                                className={`input-wrap ${errors.phone ? "error" : ""
                                    }`}
                            >

                                <i className="fa fa-phone" />

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />

                            </div>

                            {errors.phone && (

                                <span className="error-text">

                                    {errors.phone}

                                </span>

                            )}

                        </div>

                        <div className="field">
                            <label>Password</label>

                            <div
                                className={`input-wrap ${errors.password ? "error" : ""
                                    }`}
                            >
                                <i className="fa fa-lock" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create password"
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    <i
                                        className={`fa ${showPassword
                                            ? "fa-eye-slash"
                                            : "fa-eye"
                                            }`}
                                    />
                                </button>
                            </div>

                            {errors.password && (
                                <span className="error-text">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <div className="field">
                            <label>Confirm Password</label>

                            <div
                                className={`input-wrap ${errors.confirmPassword ? "error" : ""
                                    }`}
                            >
                                <i className="fa fa-lock" />

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                >
                                    <i
                                        className={`fa ${showConfirmPassword
                                            ? "fa-eye-slash"
                                            : "fa-eye"
                                            }`}
                                    />
                                </button>
                            </div>

                            {errors.confirmPassword && (
                                <span className="error-text">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="register-btn"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Create Account"}
                        </button>
                    </form>

                    <div className="register-bottom">
                        <span>Already have an account?</span>
                        <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;