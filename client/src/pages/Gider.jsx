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
      setGiderler((prevGiderler) =>
        prevGiderler.map((gider) => {
          const updatedGider = {
            ...gider,
            duzenleme: new Date(
              gider.duzenleme.seconds * 1000
            ).toLocaleDateString(),
          };
          return updatedGider;
        })
      );

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
      sorter: (a, b) => new Date(a.duzenleme) - new Date(b.duzenleme),
      sortDirections: ["ascend", "descend"],
      showSorterTooltip: false,
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
      sorter: (a, b) => a.tutar - b.tutar,
      sortDirections: ["ascend", "descend"],
      showSorterTooltip: false,
    },
  ];

  return (
    <>
      <Table dataSource={giderler} columns={columns} />
      <GiderForm />
    </>
  );
};

export default Gider;
