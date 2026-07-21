import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMe } from "../../api/authApi";
import "./_top-nav.scss";

const TopNav = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const cartItemCount = useSelector((state) => state.cart.totalItems);

  useEffect(() => {

    const loadUser = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {

        const response = await getMe();

        setUser(response.data.user);

      } catch (error) {

        localStorage.removeItem("token");

      }

    };

    loadUser();

  }, []);


  const handleLogout = () => {

    localStorage.removeItem("token");

    setUser(null);

    navigate("/login");

  };

  return (
    <div>
      <div className="header bg-dark">
        <div className="row top-nav-row">
          <div className="brand my-1">
            <h1>eStore</h1>
          </div>
          <div className="inp-container p-0 my-4 w-50 h-25 bg-white">
            <div className="dropdown m-0 p-0">
              <select className="select-btn w-100 p-0 m-0">
                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>
              </select>
            </div>
            <input className="form-control" placeholder="Search..." />
            <button>
              <i className="fa fa-search" />
            </button>
          </div>

          <div className="login-container p-0">

            {/* <i className="fa fa-user-circle user-icon" /> */}

            {!user ? (

              <>
                <h5>
                  <Link to="/login">Login</Link>
                </h5>

                /

                <h5>
                  <Link to="/register">Register</Link>
                </h5>
              </>

            ) : (

              <>
                <h5>
                  <Link to="/profile" className="profile-link">
                    <i className="fa fa-user-circle user-icon" />
                    &nbsp; Hi, {user.name}
                  </Link>
                </h5>

                {/* <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button> */}
              </>

            )}

          </div>

          <div className="cart-wishlist">
            <ul className="p-0">
              <li className="list-icon">
                <i className="fa fa-heart" />
              </li>

              <li className="list-icon">
                <i className="fa fa-shopping-cart" />

                {cartItemCount !== 0 && (
                  <div id="cart-item-count">
                    <p>{cartItemCount}</p>
                  </div>
                )}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopNav;