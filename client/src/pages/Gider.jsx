import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const data = [
  { aciklama: "Su borusu", kategori: "Bakim-Onarim", odeme: "Odendi",toplam:250,kalan:0 },
  { aciklama: "Elektrik", kategori: "Fatura", odeme: "Odenmedi",toplam:2500,kalan:0 },
  { aciklama: "Su", kategori: "Fatura", odeme: "Odendi",toplam:550,kalan:550 },
]

const Gider = () => {
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
    <div className="giderTablo">
      <table>
        <tr>
          <th>Aciklama</th>
          <th>Kategori</th>
          <th>Odeme</th>
          <th>Toplam</th>
          <th>Kalan</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.aciklama}</td>
              <td>{val.kategori}</td>
              <td>{val.odeme}</td>
              <td>{val.toplam}</td>
              <td>{val.kalan}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Gider