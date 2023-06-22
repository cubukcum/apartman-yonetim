import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "./login.css";
import { LoginOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [basarisiz, setBasarisiz] = useState(false);
  const n = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("yonetici")) {
      n("/");
    } else if (localStorage.getItem("username")) {
      n("/sakin");
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "hesaplar", username);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().sifre === parseInt(password)) {
        console.log("Giris Basarili");

        if (docSnap.data().hesapTipi === "Yönetici") {
          localStorage.setItem("username", username);
          localStorage.setItem("yonetici", true);
          n("/");
        } else {
          localStorage.setItem("username", username);
          localStorage.setItem("yonetici", false);
          localStorage.setItem("hesapAdi", docSnap.data().hesapAdi);
          n("/sakin");
        }
      } else {
        setBasarisiz(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginContainer">
      <Avatar
        style={{
          backgroundColor: "#ffd816",
          color: "black",
        }}
        icon={<LoginOutlined />}
      ></Avatar>
      <form>
        <input
          required
          type="text"
          placeholder="Kullanıcı Adı"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          required
          type="password"
          placeholder="Şifre"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={handleLogin}>Giris</button>
        {basarisiz && <p> Kullanıcı Adı veya Şifre hatalı!</p>}
        <span>
          Hesabınız yok ise kaydolun? <Link to="/register"> Kaydol </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
