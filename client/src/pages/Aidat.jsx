import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import AidatTablo from "../Components/AidatTablo";
import "./aidat.css";

const Aidat = () => {
  const n = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("yonetici")) {
    } else if (localStorage.getItem("username")) {
      n("/sakin");
    } else {
      n("/login");
    }
  });

  const [aidatlar, setAidatlar] = useState([]);
  const basliklar = [
    "Aciklama",
    "Duzenlenme Tarihi",
    "Odeme Durumu",
    "Tutar",
    "Hesap",
  ];
  const basliklar1 = [
    {
      aciklama: "Aciklama",
      duzenleme: "Duzenlenme Tarihi",
      odeme: "Odeme Durumu",
      tutar: "Tutar",
      hesap: "Hesap",
    },
  ];

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

  return (
    <div className="aidatTablo1">
      {/* <table>
        <tr>
          <th>Aciklama</th>
          <th>Duzenlenme Tarihi</th>
          <th>Odeme</th>
          <th>Tutar</th>
          <th>Hesap</th>
        </tr>
        {aidatlar.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.aciklama}</td>
              <td>{val.duzenleme}</td>
              <td>{val.odeme}</td>
              <td>{val.tutar}</td>
              <td>{val.hesap}</td>
            </tr>
          );
        })}
      </table> */}
      {basliklar1.map((baslik) => (
        <AidatTablo className="basliklar" props={baslik} />
      ))}
      {aidatlar.map((aidat) => (
        <AidatTablo className="aidatTablo" key={aidat.id} props={aidat} />
      ))}
    </div>
  );
};

export default Aidat;
