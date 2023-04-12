import React from "react";
import "./tablo.css";
const Tablo = ({ props }) => {
  return (
    <div className="tablo">
      <h3>{props.aciklama}</h3>
      <h3>{props.duzenlenme}</h3>
      <h3>{props.odeme}</h3>
      <h3>{props.tutar}</h3>
      <h3>{props.hesap}</h3>
    </div>
  );
};

export default Tablo;
