import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { UserAddOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "./register.css";

const kullaciRef = collection(db, "hesaplar");

const Register = () => {
  const [yoneticiAdi, setYoneticiAdi] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [apartmanAdi, setApartmanAdi] = useState("");
  const [bagliDaire, setBagliDaire] = useState(0);
  const [toplamDaire, setToplamDaire] = useState(0);

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

  const apartmanOlustur = async (daireSayisi, apartmanAdi) => {
    try {
      await addDoc(collection(db, "apartmanBilgisi"), {
        daireSayisi,
        apartmanAdi,
      });
      console.log("apartman koleksiyonu olusturuldu");
    } catch (error) {
      console.log("koleksiyon olusturulamadi hata var!!!", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const intDaireSayisi = parseInt(toplamDaire, 10);
    await setDoc(doc(kullaciRef, username), {
      hesapAdi: yoneticiAdi,
      sifre: password,
      hesapTipi: "Yönetici",
      bagliDaire: bagliDaire,
    });
    apartmanOlustur(intDaireSayisi, apartmanAdi);
    localStorage.setItem("username", username);
    localStorage.setItem("yonetici", true);
    n("/");
  };

  return (
    <div className="registerContainer">
      <Avatar
        style={{
          backgroundColor: "#ffd816",
          color: "black",
        }}
        icon={<UserAddOutlined />}
      >
        Register
      </Avatar>
      <form>
        <input
          required
          type="text"
          placeholder="Apartman / Site Adı"
          onChange={(event) => {
            setApartmanAdi(event.target.value);
          }}
        />
        <input
          required
          type="text"
          placeholder="Yonetici Adı"
          onChange={(event) => {
            setYoneticiAdi(event.target.value);
          }}
        />
        <input
          required
          type="number"
          placeholder="Bağlı Daire"
          onChange={(event) => {
            setBagliDaire(event.target.value);
          }}
        />
        <input
          required
          type="number"
          placeholder="Toplam Daire"
          onChange={(event) => {
            setToplamDaire(event.target.value);
          }}
        />
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
        <button onClick={handleRegister}>Kaydol</button>
        <span>
          Hesabınız var mı? <Link to="/login"> Giriş Yap </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
