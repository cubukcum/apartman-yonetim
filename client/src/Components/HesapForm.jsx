import { Button, Form, Input, Select } from "antd";
import { db } from "../firebaseConfig";
import { useState, useEffect, useMemo } from "react";
import { collection, setDoc, doc, addDoc, getDocs } from "firebase/firestore";

const hesapRef = collection(db, "hesaplar");

const HesapForm = () => {
  const [componentSize, setComponentSize] = useState("middle");
  const [hesapAdi, setHesapAdi] = useState("");
  const [hesapTipi, setHesapTipi] = useState("Kat Maliki");
  const [bagliDaire, setBagliDaire] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [toplamDaire, setToplamDaire] = useState([]);
  const [hesaplar, setHesaplar] = useState([]);
  const [waitingD, setWaitingD] = useState(true);
  const [waitingH, setWaitingH] = useState(true);

  useEffect(() => {
    fetchGeneratedNumbers();
  }, []);

  useEffect(() => {
    (async () => {
      const colRef = collection(db, "apartmanBilgisi");

      const snapshots = await getDocs(colRef);

      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setToplamDaire(docs);
      setWaitingD(false);
    })();
  }, []);

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
      setWaitingH(false);
    })();
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

  const handleSubmit = async (e) => {
    const number1 = await generateRandomNumber();
    const number2 = await generateRandomNumber();

    setLoading(true);
    await setDoc(doc(hesapRef, number1.toString()), {
      bagliDaire: bagliDaire,
      hesapAdi: hesapAdi,
      hesapTipi: hesapTipi,
      sifre: number2,
    });
    setLoading(false);
  };

  const daireSayisiHesapla = useMemo(() => {
    if (!waitingD && !waitingH) {
      const secenekler = [];
      const doluDaireler = hesaplar.map((hesap) => parseInt(hesap.bagliDaire));
      for (let i = 1; i <= toplamDaire[0]?.daireSayisi; i++) {
        if (doluDaireler.includes(i)) {
          secenekler.push(
            <Select.Option disabled key={i} value={i.toString()}>
              {i}
            </Select.Option>
          );
        } else {
          secenekler.push(
            <Select.Option key={i} value={i.toString()}>
              {i}
            </Select.Option>
          );
        }
      }
      return secenekler;
    }
    return null;
  }, [waitingD, waitingH, toplamDaire, hesaplar]);

  return (
    <Form
      className="hesapForm"
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      size={componentSize}
      style={{
        maxWidth: "60%",
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        required="true"
        onChange={(event) => {
          setHesapAdi(event.target.value);
        }}
      >
        <Input placeholder="Hesap Adı" />
      </Form.Item>
      <Form.Item>
        <Select
          placeholder="Hesap Tipi"
          onSelect={(value, event) => setHesapTipi(value)}
        >
          <Select.Option value="Kat Maliki">Kat Maliki</Select.Option>
          <Select.Option value="Kiracı">Kiracı</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Select
          placeholder="Bağlı Daire"
          onSelect={(value, event) => setBagliDaire(value)}
        >
          {daireSayisiHesapla}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          style={{ background: "#ffdc33", color: "black" }}
          loading={loading}
          type="primary"
          htmlType="submit"
        >
          Hesap Ekle
        </Button>
      </Form.Item>
    </Form>
  );
};
export default HesapForm;
