import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SakinBilgi from "../Components/SakinBilgi";
import SakinTakvim from "../Components/SakinTakvim";
import SakinDuyurular from "../Components/SakinDuyurular";
import { db } from "../firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import { Button } from "antd";

const Sakin = () => {
  const n = useNavigate();
  const [aidatlar, setAidatlar] = useState([]);
  const myName = localStorage.getItem("hesapAdi");
  useEffect(() => {
    console.log("sakin giris yapti");
    console.log(localStorage.getItem("hesapAdi"), "sakinin yoneticilik durumu");
    if (
      localStorage.getItem("username") &&
      localStorage.getItem("yonetici") === true
    ) {
      n("/");
    } else if (localStorage.getItem("username")) {
      console.log("Sakin Girisi Basarili");
      console.log(localStorage.getItem("yonetici"));
      console.log(localStorage.getItem("username"));
    }
  });

  useEffect(() => {
    (async () => {
      const colRef = collection(db, "aidatlar");
      const querySnapshot = await getDocs(colRef);

      const docs = querySnapshot.docs
        .filter((doc) => doc.data().hesap === myName)
        .map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });

      setAidatlar(docs);
    })();
  }, []);

  const handleClick = () => {
    console.log(aidatlar);
  };

  return (
    <div>
      <Button onClick={handleClick} />
      <h2>Güncel Durum</h2>
      <SakinBilgi aidat={aidatlar} />
      <SakinTakvim />
      <SakinDuyurular />
    </div>
  );
};

export default Sakin;
