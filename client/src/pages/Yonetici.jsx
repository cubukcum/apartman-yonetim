import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./yonetici.css";
import DuyuruEkle from "../Components/DuyuruEkle";
import Duyurular from "../Components/Duyurular";

const Yonetici = () => {
  const n = useNavigate();
  const [guncelle, setGuncelle] = useState(false);

  const duyuruGuncelle = () => {
    setGuncelle((onceki) => !onceki);
  };

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("yonetici")) {
    } else if (localStorage.getItem("username")) {
      n("/sakin");
    } else {
      n("/login");
    }
  });

  const [kasa, setKasa] = useState(0);
  const [tahsil, setTahsil] = useState(0);
  const [odenecek, setOdenecek] = useState(0);

  const [aidatlar, setAidatlar] = useState([]);
  const [giderler, setGiderler] = useState([]);
  useEffect(() => {
    (async () => {
      const colRef = collection(db, "aidatlar");

      const snapshots = await getDocs(colRef);

      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setAidatlar(docs);
      console.log(docs);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const colRef = collection(db, "giderler");

      const snapshots = await getDocs(colRef);

      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setGiderler(docs);
      console.log(docs);
    })();
  }, []);

  useEffect(() => {
    setKasa(0);
    setTahsil(0);
    setOdenecek(0);
    for (let i = 0; i < aidatlar.length; i++) {
      if (aidatlar[i].odeme) {
        setKasa((prevKasa) => prevKasa + parseInt(aidatlar[i].tutar));
      } else {
        setTahsil((prevTahsil) => prevTahsil + parseInt(aidatlar[i].tutar));
      }
    }
    for (let j = 0; j < giderler.length; j++) {
      if (giderler[j].odeme) {
        setKasa((prevKasa) => prevKasa - parseInt(giderler[j].tutar));
      } else {
        console.log(giderler[j]);
        setOdenecek(
          (prevOdenecek) => prevOdenecek + parseInt(giderler[j].tutar)
        );
      }
    }
  }, [aidatlar, giderler]);

  return (
    <div className="genelBakis">
      <DuyuruEkle duyuruGuncelle={duyuruGuncelle} />
      <Duyurular guncelle={guncelle} />
      <h2>Genel Bakış</h2>

      <div className="tahsil">Tahsil edilecek toplam tutar: {tahsil}</div>
      <div className="odenecek">Ödenecek toplam tutar: {odenecek} </div>
      <div className={kasa >= 0 ? "pozitif" : "negatif"}>
        Güncel Kasa Durumu: {kasa}
      </div>
      {/* <PieChart tahsil={tahsil} odenecek={odenecek} kasa={kasa} /> */}
    </div>
  );
};

export default Yonetici;
