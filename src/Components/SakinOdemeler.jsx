import { Button, Timeline } from "antd";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const SakinOdemeler = (props) => {
  const [loading, setLoading] = useState(false);

  const odemeYap = async (aidatId) => {
    try {
      setLoading(true);
      const docRef = doc(db, "aidatlar", aidatId);
      await updateDoc(docRef, { odeme: true });
      props?.aidatGuncelle();
      setLoading(false);
    } catch (error) {
      console.error("Error updating document field:", error);
    }
  };
  return (
    <div className="sakinOdemeler">
      <Timeline>
        {props.aidatlar.map((aidat, index) => (
          <Timeline.Item key={aidat.id} color={aidat.odeme ? "green" : "red"}>
            {aidat.aciklama} - Tutar: {aidat.tutar}₺ -{"  "}
            {aidat.odeme ? (
              "Ödendi"
            ) : (
              <Button
                className="sakinOdemeButonu"
                loading={loading}
                onClick={() => odemeYap(aidat.id)}
              >
                Öde
              </Button>
            )}
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default SakinOdemeler;
