import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    verifyUserOtp,
    resendUserOtp,
} from "../../Redux/Auth/actions";
import { clearAuthState } from "../../Redux/Auth/authSlice";
import "./_verifyOtp.scss";
import { toast } from "react-toastify";

const VerifyOtp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const { loading, success, error, message } = useSelector(
        (state) => state.auth
    );

    const [otp, setOtp] = useState("");

    useEffect(() => {

        if (!email) {
            navigate("/register");
        }

    }, [email, navigate]);

    useEffect(() => {

        if (success && message) {

            toast.success(message);

            if (message === "Email verified successfully.") {
                navigate("/login");
            }

            dispatch(clearAuthState());

        }

        if (error) {

            toast.error(error);

            dispatch(clearAuthState());
        }

    }, [
        success,
        error,
        message,
        dispatch,
        navigate,
    ]);

    const handleVerify = () => {

        if (!otp) {
            toast.warning("Please enter OTP.");
            return;
        }

        dispatch(
            verifyUserOtp({
                email,
                otp,
            })
        );
    };

    const handleResend = () => {

        dispatch(
            resendUserOtp({
                email,
            })
        );
    };

    return (
        <div className="verify-page">

            <div className="verify-card">

                <h2>Verify Email</h2>

                <p>
                    We've sent a verification code to
                </p>

                <strong>{email}</strong>

                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    maxLength={6}
                    onChange={(e) =>
                        setOtp(e.target.value)
                    }
                />

                <button
                    onClick={handleVerify}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Verifying..."
                            : "Verify OTP"
                    }
                </button>

                <button
                    className="resend-btn"
                    onClick={handleResend}
                >
                    Resend OTP
                </button>

                <Link to="/login">
                    Back to Login
                </Link>

            </div>

        </div>
    );
};

export default VerifyOtp;