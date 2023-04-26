import React from "react";
import "./aidatTablo.css";
const AidatTablo = ({ props, className }) => {
  return (
    <div className={className}>
      <h3>{props.aciklama}</h3>
      <h3>{props.duzenleme}</h3>
      <h3>{props.odeme === true ? "Odendi" : "Odenmedi"}</h3>
      <h3>{props.tutar}</h3>
      <h3>{props.hesap}</h3>
    </div>
  );
};

export default AidatTablo;
