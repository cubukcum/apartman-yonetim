import React from "react";
import { Doughnut } from "react-chartjs-2";

const PieChart = (props) => {
  console.log(props);
  const tahsil = props.tahsil;
  const odenecek = props.odenecek;
  const kasa = props.kasa;

  console.log(tahsil);
  console.log(odenecek);
  console.log(kasa);
  const data = {
    labels: ["Tahsil Edilecek", "Ödenecek", "Kasa"],
    datasets: [
      {
        data: [tahsil, odenecek, kasa],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default PieChart;
