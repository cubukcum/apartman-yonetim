import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SakinBilgi from "../Components/SakinBilgi";
import Duyurular from "../Components/Duyurular";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Sakin = () => {
  const n = useNavigate();
  const [aidatlar, setAidatlar] = useState([]);
  const myName = localStorage.getItem("hesapAdi");
  const isYonetici = localStorage.getItem("yonetici");

  //   useEffect(() => {
  //     console.log("sakin giris yapti");
  //     console.log(localStorage.getItem("hesapAdi"), "sakinin yoneticilik durumu");
  //     if (
  //       localStorage.getItem("username") &&
  //       localStorage.getItem("yonetici") === true
  //     ) {
  //       n("/");
  //     } else if (localStorage.getItem("username")) {
  //       console.log("Sakin Girisi Basarili");
  //       console.log(localStorage.getItem("yonetici"));
  //       console.log(localStorage.getItem("username"));
  //     }
  //   });

  //   useEffect(() => {
  //     (async () => {
  //       const colRef = collection(db, "aidatlar");
  //       const querySnapshot = await getDocs(colRef);

  //       const docs = querySnapshot.docs
  //         .filter((doc) => doc.data().hesap === myName)
  //         .map((doc) => {
  //           const data = doc.data();
  //           data.id = doc.id;
  //           return data;
  //         });

  //       setAidatlar(docs);
  //     })();
  //   }, []);

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
            return data;
          });

        setAidatlar(docs);
      })();
    }
  }, [myName, isYonetici, n]);

  return (
    <div>
      <h2>Güncel Durum</h2>
      <SakinBilgi aidat={aidatlar} />
      <Duyurular />
    </div>
  );
};

export default Sakin;
