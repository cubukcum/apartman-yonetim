import { Card } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState, useEffect } from "react";

const Duyurular = (props) => {
  const [duyurular, setDuyurular] = useState([]);

  useEffect(() => {
    (async () => {
      const colRef = collection(db, "duyurular");

      const snapshots = await getDocs(colRef);

      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setDuyurular(docs);
      console.log(docs);
    })();
  }, [props?.guncelle]);

  return (
    <Card className="duyuruContainer" title="Duyurular">
      {duyurular?.map((duyuru) => (
        <Card
          className="duyuruBox"
          key={duyuru.id}
          type="inner"
          title={
            duyuru.baslik +
            "-" +
            new Date(duyuru.tarih.seconds * 1000).toLocaleDateString()
          }
        >
          {duyuru.aciklama}{" "}
        </Card>
      ))}
    </Card>
  );
};
export default Duyurular;
