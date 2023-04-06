import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Sakin = () => {

  const n = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("yonetici")) {
      n('/');
    } else if (localStorage.getItem("username")) {
      console.log("Sakin Girisi Basarili")
      console.log(localStorage.getItem("yonetici"))
      console.log(localStorage.getItem('username'))
    }
  });


  return (
    <div>
      <h3>Guncel Durum</h3>
      <div>
        Odenmemis Borclar
        <div>50.00</div>
        <div>₺</div>
      </div>

      <div>
        Gecikmis Borclar
      </div>
    </div>
  )
}

export default Sakin