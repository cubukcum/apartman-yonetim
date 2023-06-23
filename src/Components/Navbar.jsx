import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import "./navbar.css";

const Navbar = () => {
  const [active, setActive] = useState("nav-menu");
  const [toggleIcon, setToggleIcon] = useState("nav-toggler");
  const [currentUrl, setCurrentUrl] = useState("");
  const [apartmanAdi, setApartmanAdi] = useState("");

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

  useEffect(() => {
    (async () => {
      const colRef = collection(db, "apartmanBilgisi");

      const snapshots = await getDocs(colRef);

      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setApartmanAdi(docs);
    })();
  }, []);

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
  return (
    <nav className="nav">
      <a href="" className="nav-brand">
        {currentUrl !== `${window.location.origin}/login` &&
        currentUrl !== `${window.location.origin}/register`
          ? apartmanAdi[0]?.apartmanAdi
          : "Apartman Yönetim Sistemi"}
      </a>
      <ul className={active}>
        {currentUrl !== `${window.location.origin}/login` &&
          currentUrl !== `${window.location.origin}/sakin` &&
          currentUrl !== `${window.location.origin}/register` && (
            <li className="nav-item">
              <Link to="/"> Home </Link>
            </li>
          )}
        {currentUrl !== `${window.location.origin}/login` &&
          currentUrl !== `${window.location.origin}/sakin` &&
          currentUrl !== `${window.location.origin}/register` && (
            <li className="nav-item">
              <Link to="/aidat"> Aidat </Link>
            </li>
          )}
        {currentUrl !== `${window.location.origin}/login` &&
          currentUrl !== `${window.location.origin}/sakin` &&
          currentUrl !== `${window.location.origin}/register` && (
            <li className="nav-item">
              <Link to="/gider"> Gider </Link>
            </li>
          )}
        {currentUrl !== `${window.location.origin}/login` &&
          currentUrl !== `${window.location.origin}/sakin` &&
          currentUrl !== `${window.location.origin}/register` && (
            <li className="nav-item">
              <Link to="/hesaplar"> Hesaplar </Link>
            </li>
          )}
        {currentUrl !== `${window.location.origin}/login` &&
          currentUrl !== `${window.location.origin}/register` && (
            <li className="nav-item">
              <a onClick={handleLogout} className="nav-link">
                Çıkış Yap
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
