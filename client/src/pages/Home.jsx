import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const n = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("yonetici")) {
      console.log("yonetici girisi basarili")
    } else if (localStorage.getItem("username")) {
      console.log("Sakin Girisi Basarili")
      n('/sakin');
    }else{
      n('/login');
    }
  });

  return (
    <div>Home</div>
  )
}

export default Home