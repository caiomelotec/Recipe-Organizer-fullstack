import React, { useState } from "react";
import Avatar from "react-avatar";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Header = () => {
  const [toggle, setToggle] = useState(false);

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
      <div className="avatar" onClick={() => setToggle(!toggle)}>
        <Avatar className="profile-avatar" name="Caio Melo" size="40" />
      </div>
      {toggle ? <NavBar setToggle={setToggle} /> : null}
    </header>
  );
};
