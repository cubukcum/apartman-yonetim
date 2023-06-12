import { Input, Button } from "antd";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";

const { TextArea } = Input;

const DuyuruEkle = (props) => {
  const [loading, setLoading] = useState(false);
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");

  const duyuruRef = collection(db, "duyurular");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await setDoc(doc(duyuruRef), {
      baslik: baslik ? baslik : "Yeni Duyuru",
      aciklama: aciklama,
      tarih: serverTimestamp(),
    });
    setLoading(false);
    setBaslik("");
    setAciklama("");
    props.duyuruGuncelle();
  };

  return (
    <>
      <Input
        placeholder="Duyuru Başlığı"
        onChange={(event) => {
          setBaslik(event.target.value);
        }}
        value={baslik}
        required={true}
      />
      <TextArea
        rows={4}
        maxLength={100}
        onChange={(event) => {
          setAciklama(event.target.value);
        }}
        value={aciklama}
      />
      <Button
        loading={loading}
        type="primary"
        htmlType="submit"
        onClick={handleSubmit}
      >
        Duyuru Ekle
      </Button>
    </>
  );
};
export default DuyuruEkle;
