import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const data = [
  { aciklama: "2023 Mart Aidati", kategori: "Aidat", odeme: "1 Gun Gecikti",toplam:50,kalan:50 },
  { aciklama: "2023 Mart Aidati", kategori: "Aidat", odeme: "1 Gun Gecikti",toplam:50,kalan:50 },
  { aciklama: "2023 Mart Aidati", kategori: "Aidat", odeme: "Odendi",toplam:50,kalan:0 },
]

const Aidat = () => {

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
    <div className="aidatTablo">
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

export default Aidat