import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GiderTablo from "../Components/GiderTablo";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Gider = () => {
  const n = useNavigate();
  const [giderler, setGiderler] = useState([]);

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

  return (
    <div className="giderTablo">
      {giderler.map((aidat) => (
        <GiderTablo key={aidat.id} props={aidat} />
      ))}
    </div>
  );
};

export default Gider;
