import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Tablo from "../Components/Tablo";

// const data = [
//   { aciklama: "2023 Mart Aidati", kategori: "Aidat", odeme: "1 Gun Gecikti", toplam: 50, kalan: 50 },
//   { aciklama: "2023 Mart Aidati", kategori: "Aidat", odeme: "1 Gun Gecikti", toplam: 50, kalan: 50 },
//   { aciklama: "2023 Mart Aidati", kategori: "Aidat", odeme: "Odendi", toplam: 50, kalan: 0 },
// ]

const Aidat = () => {
  const [aidatlar, setAidatlar] = useState([]);

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

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const docSnap = await getDocs(collection(db, "aidatlar"));
  //     console.log(docSnap);
  //     docSnap.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       //setAidatlar(doc)
  //       // liste.push(doc.data());
  //       setAidatlar(doc.data());
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //     console.log("ilk");
  //     console.log(aidatlar);
  //     console.log("son");
  //   } catch (error) {
  //     console.log("hatavar");
  //     console.log(error);
  //   }
  // };

  const n = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("yonetici")) {
      console.log("basarili");
    } else if (localStorage.getItem("username")) {
      console.log("Sakin Girisi Basarili");
      n("/sakin");
    } else {
      console.log("yanlis yerdesins");
      n(-1);
    }
  });

  return (
    <div className="aidatTablo">
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
      {aidatlar.map((aidat) => (
        <Tablo props={aidat} />
      ))}
    </div>
  );
};

export default Aidat;
