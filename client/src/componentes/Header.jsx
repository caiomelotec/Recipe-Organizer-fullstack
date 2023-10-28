import React from "react";
import Avatar from "react-avatar";
import "../styles/Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
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
        <Avatar className="profile-avatar" name="Caio Melo" size="40" />
      </div>
    </header>
  );
};
