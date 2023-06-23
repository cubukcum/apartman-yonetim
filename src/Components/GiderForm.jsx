import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { setDoc, doc, collection } from "firebase/firestore";

const giderRef = collection(db, "giderler");

const GiderForm = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const [loading, setLoading] = useState(false);
  const [duzenlemeTarihi, setDuzenlemeTarihi] = useState();
  const [aciklama, setAciklama] = useState("");
  const [kategori, setKategori] = useState("");
  const [tutar, setTutar] = useState("");
  const [odendi, setOdendi] = useState(false);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    await setDoc(doc(giderRef), {
      aciklama: aciklama,
      duzenleme: duzenlemeTarihi.$d,
      kategori: kategori,
      odeme: odendi,
      tutar: tutar,
    });
    setLoading(false);
    props?.giderGuncelle();
  };

  return (
    <Form
      className="giderForm"
      labelCol={{
        span: 30,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: "80%",
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="aciklama"
        rules={[{ required: true, message: "Açıklama giriniz" }]}
      >
        <Input
          placeholder="Açıklama"
          onChange={(event) => setAciklama(event.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="kategori"
        rules={[{ required: true, message: "Kategori seçiniz" }]}
      >
        <Select
          placeholder="Kategori"
          onChange={(value, event) => setKategori(value)}
        >
          <Select.Option value="Asansör Bakımı">Asansör</Select.Option>
          <Select.Option value="Demirbaş">Demirbaş</Select.Option>
          <Select.Option value="Elektrik">Elektrik</Select.Option>
          <Select.Option value="Personel">Personel</Select.Option>
          <Select.Option value="Temizlik">Temizlik</Select.Option>
          <Select.Option value="Yakıt">Yakıt</Select.Option>
          <Select.Option value="Yönetim">Yönetim</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="tarih"
        rules={[{ required: true, message: "Tarihi seçiniz" }]}
      >
        <DatePicker
          placeholder="Tarih Seçiniz"
          onChange={(value, event) => setDuzenlemeTarihi(value)}
        />
      </Form.Item>
      <Form.Item
        name="tutar"
        rules={[{ required: true, message: "Tutar giriniz" }]}
      >
        <InputNumber
          placeholder="Tutar"
          onChange={(value, event) => setTutar(value)}
        />
      </Form.Item>
      <Form.Item valuePropName="checked">
        <Switch onChange={(value, event) => setOdendi(value)} />
        <h4 style={{ color: odendi ? "green" : "red" }}>
          {odendi ? "Ödendi" : "Ödenmedi"}
        </h4>
      </Form.Item>
      <Form.Item
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          style={{ background: "#ffdc33", color: "black" }}
          loading={loading}
          type="primary"
          htmlType="submit"
        >
          Gider Ekle
        </Button>
      </Form.Item>
    </Form>
  );
};
export default GiderForm;
