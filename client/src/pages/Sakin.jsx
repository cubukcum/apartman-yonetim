import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SakinBilgi from "../Components/SakinBilgi";

const Sakin = () => {
  const n = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("yonetici")) {
      n("/");
    } else if (localStorage.getItem("username")) {
      console.log("Sakin Girisi Basarili");
      console.log(localStorage.getItem("yonetici"));
      console.log(localStorage.getItem("username"));
    }
  });

  return (
    <div>
      <h3>Guncel Durum</h3>
      <SakinBilgi />
    </div>
  );
};

export default Sakin;
