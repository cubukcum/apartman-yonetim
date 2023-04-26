import React from "react";
import "./giderTablo.css";
const GiderTablo = ({ props }) => {
  return (
    <div className="giderTablo">
      <h3>{props.aciklama}</h3>
      <h3>{props.duzenleme}</h3>
      <h3>{props.odeme === true ? "Odendi" : "Odenmedi"}</h3>
      <h3>{props.tutar}</h3>
      <h3>{props.kategori}</h3>
    </div>
  );
};

export default GiderTablo;
