import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [active, setActive] = useState("nav-menu");
  const [toggleIcon, setToggleIcon] = useState("nav-toggler");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);

    const handleUrlChange = () => {
      setCurrentUrl(window.location.href);
    };
    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [window.location.href]);

  const navToggle = () => {
    active === "nav-menu"
      ? setActive("nav-menu nav-active")
      : setActive("nav-menu");

    toggleIcon === "nav-toggler"
      ? setToggleIcon("nav-toggler toggle")
      : setToggleIcon("nav-toggler");
  };

  const n = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    n("/login");
  };
  console.log(currentUrl);
  return (
    <nav className="nav">
      <a href="" className="nav-brand">
        adakale
      </a>
      <ul className={active}>
        {currentUrl !== "http://localhost:3000/login" &&
          currentUrl !== "http://localhost:3000/sakin" && (
            <li className="nav-item">
              <Link to="/"> Home </Link>
            </li>
          )}
        {currentUrl !== "http://localhost:3000/login" &&
          currentUrl !== "http://localhost:3000/sakin" && (
            <li className="nav-item">
              <Link to="/aidat"> Aidat </Link>
            </li>
          )}
        {currentUrl !== "http://localhost:3000/login" &&
          currentUrl !== "http://localhost:3000/sakin" && (
            <li className="nav-item">
              <Link to="/gider"> Gider </Link>
            </li>
          )}
        {currentUrl !== "http://localhost:3000/login" &&
          currentUrl !== "http://localhost:3000/sakin" && (
            <li className="nav-item">
              <Link to="/hesaplar"> Hesaplar </Link>
            </li>
          )}
        {currentUrl !== "http://localhost:3000/login" && (
          <li className="nav-item">
            <a onClick={handleLogout} className="nav-link">
              LogOut
            </a>
          </li>
        )}
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
