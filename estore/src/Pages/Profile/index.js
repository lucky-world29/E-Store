import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../api/authApi";
import "./_profile.scss";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getMe();
                setUser(response.data.user);
            } catch (error) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        loadUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const fullName = useMemo(() => {
        if (!user) return "";
        const nameFromParts = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
        return nameFromParts || user.name || "My Account";
    }, [user]);

    const memberSince = useMemo(() => {
        if (!user?.createdAt) return "N/A";
        return new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    }, [user]);

    if (!user) {
        return (
            <div className="profile-page">
                <div className="profile-loading">Loading...</div>
            </div>
        );
    }

    const initial =
        (user.firstName?.charAt(0) || user.name?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase();

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-hero">
                    <div className="profile-hero-left">
                        <div className="profile-avatar-wrap">
                            {user.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt={fullName}
                                    className="profile-avatar-img"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                        e.currentTarget.parentElement.classList.add("fallback");
                                    }}
                                />
                            ) : null}

                            <div className={`profile-avatar ${user.profileImage ? "has-image" : "fallback"}`}>
                                {!user.profileImage && initial}
                            </div>
                        </div>

                        <div className="profile-hero-text">
                            <h1>{fullName}</h1>

                            <div className="profile-meta">
                                <span className="badge badge-role">
                                    {user.role || "customer"}
                                </span>

                                <span className={`badge ${user.isVerified ? "badge-success" : "badge-warning"}`}>
                                    {user.isVerified ? "Verified" : "Unverified"}
                                </span>

                                <span className={`badge ${user.isBlocked ? "badge-danger" : "badge-success"}`}>
                                    {user.isBlocked ? "Blocked" : "Active"}
                                </span>
                            </div>

                            <p className="profile-subtitle">
                                Member since {memberSince}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="profile-grid">
                    <div className="profile-card">
                        <div className="card-title-row">
                            <h2>Personal Information</h2>
                        </div>

                        <div className="profile-details">
                            <div className="detail-row">
                                <span className="detail-label">First Name</span>
                                <span className="detail-value">{user.firstName || "N/A"}</span>
                            </div>

                            <div className="detail-row">
                                <span className="detail-label">Last Name</span>
                                <span className="detail-value">{user.lastName || "N/A"}</span>
                            </div>

                            <div className="detail-row">
                                <span className="detail-label">Email</span>
                                <span className="detail-value">{user.email || "N/A"}</span>
                            </div>

                            <div className="detail-row">
                                <span className="detail-label">Phone</span>
                                <span className="detail-value">{user.phone || "N/A"}</span>
                            </div>

                            <div className="detail-row">
                                <span className="detail-label">Role</span>
                                <span className="detail-value">{user.role || "customer"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-card">
                        <div className="card-title-row">
                            <h2>Account Status</h2>
                        </div>

                        <div className="status-list">
                            <div className="status-row">
                                <span>Email Verified</span>
                                <strong className={user.isVerified ? "text-success" : "text-warning"}>
                                    {user.isVerified ? "Yes" : "No"}
                                </strong>
                            </div>

                            <div className="status-row">
                                <span>Account Status</span>
                                <strong className={user.isBlocked ? "text-danger" : "text-success"}>
                                    {user.isBlocked ? "Blocked" : "Active"}
                                </strong>
                            </div>

                            <div className="status-row">
                                <span>Member Since</span>
                                <strong>{memberSince}</strong>
                            </div>

                            <div className="status-row">
                                <span>User ID</span>
                                <strong>{user._id ? user._id.slice(-8) : "N/A"}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-card">
                    <div className="card-title-row">
                        <h2>Quick Actions</h2>
                    </div>

                    <div className="action-grid">
                        <button
                            type="button"
                            className="action-card"
                            onClick={() => navigate("/orders")}
                        >
                            <span className="action-icon">📦</span>
                            <span className="action-text">My Orders</span>
                        </button>

                        <button
                            type="button"
                            className="action-card"
                            onClick={() => navigate("/wishlist")}
                        >
                            <span className="action-icon">❤</span>
                            <span className="action-text">Wishlist</span>
                        </button>

                        <button
                            type="button"
                            className="action-card"
                            onClick={() => navigate("/addresses")}
                        >
                            <span className="action-icon">📍</span>
                            <span className="action-text">Saved Addresses</span>
                        </button>

                        <button
                            type="button"
                            className="action-card"
                            onClick={() => navigate("/change-password")}
                        >
                            <span className="action-icon">🔒</span>
                            <span className="action-text">Change Password</span>
                        </button>
                    </div>

                    <div className="profile-footer-actions">
                        <button
                            type="button"
                            className="edit-btn"
                            onClick={() => navigate("/edit-profile")}
                        >
                            Edit Profile
                        </button>

                        <button
                            type="button"
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;