import { Button, Form, Input, InputNumber, Radio, Select } from "antd";
import { db } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { collection, setDoc, doc, addDoc, getDocs } from "firebase/firestore";

const hesapRef = collection(db, "hesaplar");

const HesapForm = () => {
  const [componentSize, setComponentSize] = useState("middle");
  const [hesapAdi, setHesapAdi] = useState("");
  const [hesapTipi, setHesapTipi] = useState("Kat Maliki");
  const [bagliDaire, setBagliDaire] = useState("");
  const [loading, setLoading] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  useEffect(() => {
    fetchGeneratedNumbers();
  }, []);

  const fetchGeneratedNumbers = async () => {
    const querySnapshot = await getDocs(collection(db, "randomNumbers"));
    const numbers = [];
    querySnapshot.forEach((doc) => {
      numbers.push(doc.data().number);
    });
    setGeneratedNumbers(numbers);
  };

  const generateRandomNumber = async () => {
    let newNumber;
    do {
      const min = 10000;
      const max = 99999;
      newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (generatedNumbers.includes(newNumber));

    setRandomNumber(newNumber);

    try {
      await addDoc(collection(db, "randomNumbers"), {
        number: newNumber,
      });
      setGeneratedNumbers([...generatedNumbers, newNumber]);
      return newNumber;
    } catch (error) {
      console.log("Error saving generated number:", error);
    }
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    console.log(hesapAdi);
    console.log(hesapTipi);
    console.log(bagliDaire);
  };

  //   const generateRandomNumber = () => {
  //     const min = 10000;
  //     const max = 99999;
  //     return Math.floor(Math.random() * (max - min + 1)) + min;
  //   };

  const handleSubmit = async (e) => {
    const number1 = await generateRandomNumber();
    const number2 = await generateRandomNumber();

    setLoading(true);
    await setDoc(doc(hesapRef, number1.toString()), {
      bagliDaire: bagliDaire,
      hesapAdi: hesapAdi,
      hesapTipi: hesapTipi,
      //   kullaniciNo: generateRandomNumber(),
      sifre: number2,
    });
    setLoading(false);
  };

  return (
    <Form
      labelCol={{
        span: 40,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Hesap Adı"
        onChange={(event) => {
          setHesapAdi(event.target.value);
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Hesap Tipi">
        <Select onSelect={(value, event) => setHesapTipi(value)}>
          <Select.Option value="Kat Maliki">Kat Maliki</Select.Option>
          <Select.Option value="Kiracı">Kiracı</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Bağlı Daire">
        <Select onSelect={(value, event) => setBagliDaire(value)}>
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
          <Select.Option value="4">4</Select.Option>
          <Select.Option value="5">5</Select.Option>
          <Select.Option value="6">6</Select.Option>
          <Select.Option value="7">7</Select.Option>
          <Select.Option value="8">8</Select.Option>
          <Select.Option value="9">9</Select.Option>
          <Select.Option value="10">10</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          Hesap Ekle
        </Button>
      </Form.Item>
    </Form>
  );
};
export default HesapForm;
