import { useState } from "react";
import Avatar from "react-avatar";
import "../styles/Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { useAuthStore } from "../store/authStore";
export const Header = () => {
  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser || null,
  }));

  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // console.log(currentUser);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" style={{ color: "inherit" }}>
          <h1>Koch</h1>
        </Link>
      </div>
      <div className="search-bar">
        <input
          type="search"
          className="search-bar"
          placeholder="z.B Pfannkuchen, Lasagne, Low Carb"
        />
      </div>
      <div className="avatar">
        {currentUser === null ? (
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
            style={
              location.pathname === "/login"
                ? { display: "none" }
                : { display: "block" }
            }
          >
            Anmelden
          </button>
        ) : (
          <div>
            <Avatar
              className="profile-avatar"
              name={`${currentUser.firstname} ${currentUser.lastname}`}
              size="40"
              onClick={() => setToggle(!toggle)}
            />
            {toggle ? <NavBar setToggle={setToggle} /> : null}
          </div>
        )}
      </div>
    </header>
  );
};
