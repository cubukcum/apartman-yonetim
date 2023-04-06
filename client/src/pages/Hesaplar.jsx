import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const data = [
  { hesapAdi: "Hamza sevinc", hesapTipi: "Aidat", bagliDaire: "1 Gun Gecikti",telefon:50,bakiye:50 },
  { hesapAdi: "Ramazan Ersoy", hesapTipi: "Aidat", bagliDaire: "1 Gun Gecikti",telefon:50,bakiye:50 },
  { hesapAdi: "Kenan Yesilyurt", hesapTipi: "Aidat", bagliDaire: "1 Gun Gecikti",telefon:50,bakiye:50 },
]

const Hesaplar = () => {

  const n = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("yonetici")) {
      console.log("basarili");
    } else if (localStorage.getItem("username")) {
      console.log("Sakin Girisi Basarili")
      n('/sakin');
    }else{
      console.log("yanlis yerdesins")
      n(-1)
    }
  });


  return (
    <div className="hesaplarTablo">
      <table>
        <tr>
          <th>Hesap Adi</th>
          <th>Hesap Tipi</th>
          <th>Bagli Daire</th>
          <th>Telefon</th>
          <th>Bakiye</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.hesapAdi}</td>
              <td>{val.hesapTipi}</td>
              <td>{val.bagliDaire}</td>
              <td>{val.telefon}</td>
              <td>{val.bakiye}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Hesaplar