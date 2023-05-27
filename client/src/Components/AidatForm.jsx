import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const aidatRef = collection(db, "aidatlar");

const AidatForm = ({ aidatEklendi }) => {
  const [componentSize, setComponentSize] = useState("default");
  const [loading, setLoading] = useState(false);
  const [aciklama, setAciklama] = useState("");
  const [duzenlemeTarihi, setDuzenlemeTarihi] = useState();
  const [tutar, setTutar] = useState(0);
  const [hesaplar, setHesaplar] = useState([]);
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    (async () => {
      const hesaplarRef = collection(db, "hesaplar");
      const snapshots = await getDocs(hesaplarRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setHesaplar(docs);
    })();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    for (let i = 0; i < hesaplar.length; i++) {
      const isim = hesaplar[i].hesapAdi;
      await setDoc(doc(aidatRef), {
        aciklama: aciklama,
        duzenleme: duzenlemeTarihi.$d,
        hesap: isim,
        odeme: false,
        tutar: tutar,
      });
    }
    aidatEklendi();
    setLoading(false);
  };

  return (
    <Form
      labelCol={{
        span: 10,
      }}
      layout="inline"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 800,
      }}
      onFinish={handleSubmit}
    >
      <Form.Item required="true" label="Açıklama">
        <Input onChange={(event) => setAciklama(event.target.value)} />
      </Form.Item>

      <Form.Item required="true" label="Düzenleme Tarihi">
        <DatePicker
          placeholder="Tarih Seçiniz"
          onChange={(value) => setDuzenlemeTarihi(value)}
        />
      </Form.Item>
      <Form.Item required="true" label="Tutar">
        <InputNumber onChange={(value, event) => setTutar(value)} />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Aidat Ekle
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AidatForm;
