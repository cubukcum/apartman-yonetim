import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Duyurular from "../Components/Duyurular";
import SakinOdemeler from "../Components/SakinOdemeler";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./sakin.css";

const Sakin = () => {
  const n = useNavigate();
  const [aidatlar, setAidatlar] = useState([]);
  const myName = localStorage.getItem("hesapAdi");
  const isYonetici = localStorage.getItem("yonetici");
  const [guncelle, setGuncelle] = useState(false);

  const aidatGuncelle = () => {
    setGuncelle((onceki) => !onceki);
  };

  const odenmemisBorclar = () => {
    let borc = 0;
    for (let i = 0; i < aidatlar.length; i++) {
      if (!aidatlar[i].odeme) {
        borc += aidatlar[i].tutar;
      }
    }
    return borc;
  };

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      n("/login");
    } else if (isYonetici === "true") {
      n("/");
    } else {
      (async () => {
        const colRef = collection(db, "aidatlar");
        const querySnapshot = await getDocs(colRef);

        const docs = querySnapshot.docs
          .filter((doc) => doc.data().hesap === myName)
          .map((doc) => {
            const data = doc.data();
            data.id = doc.id;
            data.duzenleme = new Date(data.duzenleme.seconds * 1000);
            return data;
          });
        docs.sort((a, b) => a.duzenleme - b.duzenleme);

        setAidatlar(docs);
      })();
    }
  }, [myName, isYonetici, guncelle]);

  return (
    <div className="sakin">
      <h2>Sayın {myName} Hoşgeldiniz</h2>
      <SakinOdemeler aidatlar={aidatlar} aidatGuncelle={aidatGuncelle} />
      <h4>Toplam borcunuz: {odenmemisBorclar()}₺</h4>
      <Duyurular />
    </div>
  );
};

export default Sakin;
