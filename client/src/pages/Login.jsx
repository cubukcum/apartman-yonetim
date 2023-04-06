import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";




const Login = () => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const n = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("yoneticiMi")) {
      n('/')
    } else if (localStorage.getItem("username")) {
      n('/sakin')
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "kullanicilar", username);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().Sifre === password) {
        console.log("Giris Basarili");

        if (docSnap.data().yoneticiMi === true) {
          localStorage.setItem('username', username)
          localStorage.setItem('yonetici', true)
          n('/');
        } else {
          localStorage.setItem('username', username)
          localStorage.setItem('yonetici', false)
          n('/sakin');
        }
      } else {
        console.log("Kullanici Adi Bulunmuyor")
      }

    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder='Kullanici Adi' onChange={(event) => { setUserName(event.target.value) }} />
        <input required type="password" placeholder='Sifre' onChange={(event) => { setPassword(event.target.value) }} />
        <button onClick={handleLogin}>Giris</button>
        <p> Bu bir hatadir!</p>
        <span>Hesabiniz yok ise kaydolun? < Link to="/register"> Kaydol </ Link>  </span>
      </form>
    </div>
  )
}

export default Login