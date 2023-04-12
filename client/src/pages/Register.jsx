import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import "./register.css";

const kullaciRef = collection(db, "kullanicilar");

const Register = () => {
  const [yoneticiAdi, setYoneticiAdi] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const n = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("username") &&
      localStorage.getItem("yoneticiMi")
    ) {
      console.log("Yonetici Girisi Basarili");
    } else if (localStorage.getItem("username")) {
      n("/sakin");
    }
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    await setDoc(doc(kullaciRef, username), {
      Ad: yoneticiAdi,
      Sifre: password,
      yoneticiMi: true,
    });
    localStorage.setItem("username", username);
    localStorage.setItem("yonetici", true);
    n("/");
  };

  return (
    <div className="registerContainer">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="Yonetici Adi"
          onChange={(event) => {
            setYoneticiAdi(event.target.value);
          }}
        />
        <input
          required
          type="text"
          placeholder="Kullanici Adi"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          required
          type="password"
          placeholder="Sifre"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={handleRegister}>Kaydol</button>
        <p> Bu bir hatadir!</p>
        <span>
          Hesabiniz var mi? <Link to="/login"> Giris Yap </Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default Register;
