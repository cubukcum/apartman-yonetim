import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import HesapForm from "../Components/HesapForm";
import { Space, Table, Tag } from "antd";
import { collection, getDocs } from "firebase/firestore";

const Hesaplar = () => {
  const n = useNavigate();
  const [hesaplar, setHesaplar] = useState([]);
  const [aidatlar, setAidatlar] = useState([]);

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
      const colRef = collection(db, "hesaplar");

      const snapshots = await getDocs(colRef);

      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setHesaplar(docs);
      console.log(docs);
    })();
  }, []);

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
    for (let i = 0; i < hesaplar.length; i++) {
      let bakiye = 0;
      for (let j = 0; j < aidatlar.length; j++) {
        if (
          aidatlar[j].hesap === hesaplar[i].hesapAdi &&
          aidatlar[j].odeme === false
        ) {
          bakiye = bakiye + aidatlar[j].tutar;
          setHesaplar((prevHesaplar) =>
            prevHesaplar.map((hesap) =>
              hesap.hesapAdi === hesaplar[i].hesapAdi
                ? { ...hesap, bakiye: bakiye }
                : hesap
            )
          );
        }
      }
    }
  }, [aidatlar]);

  const columns = [
    {
      title: "Hesap Adı",
      dataIndex: "hesapAdi",
      key: "hesapAdi",
    },
    {
      title: "Hesap Tipi",
      dataIndex: "hesapTipi",
      key: "hesapTipi",
    },
    {
      title: "Bağlı Daire",
      dataIndex: "bagliDaire",
      key: "bagliDaire",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.bagliDaire - b.bagliDaire,
    },
    {
      title: "Kullanıcı No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Şifre",
      dataIndex: "sifre",
      key: "sifre",
    },
    {
      title: "Bakiye",
      dataIndex: "bakiye",
      key: "bakiye",
    },
  ];

  console.log("son check");
  console.log(hesaplar);
  console.log("en son check");
  return (
    <>
      <Table dataSource={hesaplar} columns={columns} />
      <HesapForm />
    </>
  );
};

export default Hesaplar;
