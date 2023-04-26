import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./yonetici.css";

const Yonetici = () => {
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
      <h2>Genel Bakis</h2>

      <div className="tahsil">Tahsil edilecek toplam tutar {tahsil}</div>
      <div className="odenecek">Odenecek toplam tutar {odenecek} </div>
      <div className={kasa >= 0 ? "pozitif" : "negatif"}>
        Guncel Kasa Durumu {kasa}
      </div>
    </div>
  );
};

export default Yonetici;
