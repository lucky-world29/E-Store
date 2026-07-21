import { useEffect, useState } from "react";
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

    if (!user) {
        return <h3 style={{ padding: "40px" }}>Loading...</h3>;
    }

    return (
        <div className="profile-page">

            <div className="profile-card">

                <h2>My Profile</h2>

                <hr />

                <div className="profile-info">

                    <p>
                        <strong>Name :</strong> {user.name}
                    </p>

                    <p>
                        <strong>Email :</strong> {user.email}
                    </p>

                    <p>
                        <strong>Role :</strong> {user.role}
                    </p>

                </div>

                <div className="profile-actions">

                    <button className="profile-btn">
                        My Orders
                    </button>

                    <button className="profile-btn">
                        Wishlist
                    </button>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );

};

export default Profile;