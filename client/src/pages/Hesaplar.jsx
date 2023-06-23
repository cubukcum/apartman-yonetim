import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import HesapForm from "../Components/HesapForm";
import { Table } from "antd";
import { collection, getDocs } from "firebase/firestore";
import "./hesaplar.css";

const Hesaplar = () => {
  const n = useNavigate();
  const [hesaplar, setHesaplar] = useState([]);
  const [aidatlar, setAidatlar] = useState([]);
  const [guncelle, setGuncelle] = useState(false);

  const hesapGuncelle = () => {
    setGuncelle((onceki) => !onceki);
  };

  useEffect(() => {
    const checkUser = () => {
      const username = localStorage.getItem("username");
      const yonetici = localStorage.getItem("yonetici");

      if (!username || yonetici !== "true") {
        if (username) {
          n("/sakin");
        } else {
          n("/login");
        }
      }
    };

    checkUser();
  }, [n]);

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
    })();
  }, [guncelle]);

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
    })();
  }, [guncelle]);

  useEffect(() => {
    for (let i = 0; i < hesaplar.length; i++) {
      let bakiye = 0;
      for (let j = 0; j < aidatlar.length; j++) {
        if (
          aidatlar[j].hesap === hesaplar[i].hesapAdi &&
          aidatlar[j].odeme === false
        ) {
          bakiye = bakiye + aidatlar[j].tutar;
        }
      }
      setHesaplar((prevHesaplar) => {
        const updatedHesaplar = prevHesaplar.map((hesap) =>
          hesap.hesapAdi === hesaplar[i].hesapAdi
            ? { ...hesap, bakiye: bakiye }
            : hesap
        );
        return updatedHesaplar;
      });
    }
  }, [aidatlar, guncelle]);

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
  return (
    <div className="hesaplarContainer">
      <Table dataSource={hesaplar} columns={columns} />
      <HesapForm hesapGuncelle={hesapGuncelle} />
    </div>
  );
};

export default Hesaplar;
