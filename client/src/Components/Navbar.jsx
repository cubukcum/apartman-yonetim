import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/management.png";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [active, setActive] = useState("nav-menu");
  const [toggleIcon, setToggleIcon] = useState("nav-toggler");
  const navToggle = () => {
    active === "nav-menu"
      ? setActive("nav-menu nav-active")
      : setActive("nav-menu");

    //TogglerIcon

    toggleIcon === "nav-toggler"
      ? setToggleIcon("nav-toggler toggle")
      : setToggleIcon("nav-toggler");
  };

  const n = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    n("/login");
  };

  return (
    <nav className="nav">
      <a href="#" className="nav-brand">
        {" "}
        yonetim{" "}
      </a>
      <ul className={active}>
        <li className="nav-item">
          {/* {<a href="#" className="nav-link">
            Home
          </a>} */}
          <Link to="/"> Home </Link>
        </li>
        <li className="nav-item">
          {/* <a href="#" className="nav-link">
            Aidat
          </a> */}
          <Link to="/aidat"> Aidat </Link>
        </li>
        <li className="nav-item">
          {/* <a href="#" className="nav-link">
            Gider
          </a> */}
          <Link to="/gider"> Gider </Link>
        </li>
        <li className="nav-item">
          {/* <a href="#" className="nav-link">
            Hesaplar
          </a> */}
          <Link to="/hesaplar"> Hesaplar </Link>
        </li>
        <li className="nav-item">
          <a onClick={handleLogout} className="nav-link">
            LogOut
          </a>
        </li>
      </ul>
      <div onClick={navToggle} className={toggleIcon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};

export default Navbar;
