import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import AidatForm from "../Components/AidatForm";
import "./aidat.css";
import { Table, Tag } from "antd";

const Aidat = () => {
  const n = useNavigate();
  const [guncelle, setGuncelle] = useState(false);

  const aidatEklendi = () => {
    setGuncelle((prevGuncelle) => !prevGuncelle);
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
      setAidatlar((prevAidatlar) =>
        prevAidatlar.map((aidat) => {
          const updatedAidat = {
            ...aidat,
            duzenleme: new Date(
              aidat.duzenleme.seconds * 1000
            ).toLocaleDateString(),
          };
          return updatedAidat;
        })
      );
    })();
  }, [guncelle]);

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
      render: (_, { odeme }) => {
        let color = odeme ? "green" : "red";
        let name = odeme ? "ÖDENDİ" : "ÖDENMEDİ";
        return (
          <Tag color={color} key={odeme}>
            {name}
          </Tag>
        );
      },
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
      sorter: (a, b) => a.hesap.localeCompare(b.hesap),
      sortDirections: ["ascend", "descend"],
      showSorterTooltip: false,
    },
  ];

  return (
    <div className="aidatContainer">
      <Table dataSource={aidatlar} columns={columns} />
      <AidatForm aidatEklendi={aidatEklendi} />
    </div>
  );
};

export default Aidat;
