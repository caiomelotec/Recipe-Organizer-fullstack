import React from "react";
import "../styles/Login.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export const Register = () => {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form className="login-form">
          <div className="filter-div"></div>
          <h1 className="login-title">Koch</h1>
          <h3 className="login-subtitle">Neues Konto erstellen</h3>

          <div className="email-div">
            <CgProfile className="email-icon-login" />
            <input
              type="text"
              placeholder="Vorname"
              name="firstname"
              id="firstname"
            />
          </div>

          <div className="email-div">
            <CgProfile className="email-icon-login" />
            <input
              type="text"
              placeholder="Nachname"
              name="lastname"
              id="lastname"
            />
          </div>
          <div className="email-div">
            <MdOutlineMailOutline className="email-icon-login" />
            <input type="email" placeholder="Email" name="email" id="email" />
          </div>
          <div className="password-div">
            <RiLockPasswordLine className="password-icon-login" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
            />
          </div>
          <button className="login-page-btn">Einloggen</button>
          <span className="loginlink">Du hast bereits ein Koch-Konto?</span>
          <Link to="/login" className="login-link">
            Jetzt einloggen
          </Link>
        </form>
      </div>
    </div>
  );
};
