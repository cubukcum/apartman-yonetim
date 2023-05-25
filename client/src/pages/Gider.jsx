import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Space, Table, Tag } from "antd";
import GiderForm from "../Components/GiderForm";

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

  const columns = [
    {
      title: "Açıklama",
      dataIndex: "aciklama",
      key: "aciklama",
    },
    {
      title: "Düzenleme",
      dataIndex: "duzenleme",
      key: "duzenleme",
    },
    {
      title: "Kategori",
      dataIndex: "kategori",
      key: "kategori",
    },
    {
      title: "Ödeme",
      dataIndex: "odeme",
      key: "odeme",
    },
    {
      title: "Tutar",
      dataIndex: "tutar",
      key: "tutar",
    },
  ];

  return (
    // <div className="giderTablo">
    //   {giderler.map((aidat) => (
    //     <GiderTablo key={aidat.id} props={aidat} />
    //   ))}
    // </div>
    <>
      <Table dataSource={giderler} columns={columns} />
      <GiderForm />
    </>
  );
};

export default Gider;
