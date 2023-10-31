import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { TfiWrite } from "react-icons/tfi";

export const NavBar = ({ setToggle }) => {
  return (
    <nav className="navbar-container">
      <div className="profile nav-item">
        <CgProfile />
        <Link
          to="/profile"
          className="nav-link"
          onClick={() => setToggle(false)}
        >
          Mein Profil
        </Link>
      </div>
      <div className="add-recipe-nav nav-item">
        <TfiWrite />
        <Link
          to="/addrecipe"
          className="nav-link"
          onClick={() => setToggle(false)}
        >
          Rezept eingeben
        </Link>
      </div>
      <div className="login-logout-nav nav-item">
        <FiLogOut />
        <span className="nav-link" onClick={() => setToggle(false)}>
          Ausloggen
        </span>
      </div>
    </nav>
  );
};
