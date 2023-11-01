import { useState } from "react";
import Avatar from "react-avatar";
import "../styles/Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Header = () => {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
        {/* <Avatar className="profile-avatar" name="Caio Melo" size="40"  onClick={() => setToggle(!toggle)}/>
        {toggle ? <NavBar setToggle={setToggle} /> : null} */}
      </div>
    </header>
  );
};
