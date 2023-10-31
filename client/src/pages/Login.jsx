import React from "react";
import "../styles/Login.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";

export const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form className="login-form">
          <div className="filter-div"></div>
          <h1 className="login-title">Koch</h1>
          <h3 className="login-subtitle">Jetzt einloggen</h3>
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
          <span className="loginlink">Du hast noch kein Koch-Konto?</span>
          <span className="login-link">Neues Konto erstellen</span>
        </form>
      </div>
    </div>
  );
};
