import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

import { Space, Table, Tag } from "antd";

const aidatRef = collection(db, "aidatlar");

const Aidat = () => {
  const n = useNavigate();
  const [formAciklama, setFormAciklama] = useState("");
  const [formTarih, setFormTarih] = useState("");
  const [formTutar, setFormTutar] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("yonetici")) {
    } else if (localStorage.getItem("username")) {
      n("/sakin");
    } else {
      n("/login");
    }
  });

  const [aidatlar, setAidatlar] = useState([]);
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
      docs.sort((a, b) => a.hesap.localeCompare(b.hesap));
      setAidatlar(docs);
      console.log(docs);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const colRef = collection(db, "daireler");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setDaireler(docs);
    })();
  }, []);

  const [daireler, setDaireler] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let i = 0; i < daireler.length; i++) {
      const isim = daireler[i].isim;
      await setDoc(doc(aidatRef), {
        aciklama: formAciklama,
        duzenleme: formTarih,
        hesap: isim,
        odeme: false,
        tutar: formTutar,
      });
    }

    const colRef = collection(db, "aidatlar");
    const snapshots = await getDocs(colRef);
    const docs = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    docs.sort((a, b) => a.hesap.localeCompare(b.hesap));
    setAidatlar(docs);
  };

  const columns = [
    {
      title: "Açıklama",
      dataIndex: "aciklama",
      key: "aciklama",
    },
    {
      title: "Düzenlenme Tarihi",
      dataIndex: "duzenleme",
      key: "duzenleme",
    },
    {
      title: "Durum",
      dataIndex: "odeme",
      key: "odeme",
    },
    {
      title: "Tutar",
      dataIndex: "tutar",
      key: "tutar",
    },
    {
      title: "Hesap",
      dataIndex: "hesap",
      key: "hesap",
    },
  ];

  return <Table dataSource={aidatlar} columns={columns} />;
};

export default Aidat;
