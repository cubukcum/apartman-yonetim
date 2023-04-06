import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../img/management.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const n = useNavigate();

const handleLogout = () => {
  localStorage.clear();
  n('/login');
}

  return (
    <div className='navbar'>
        <div className="container">
            <div className="logo">
              <img src={Logo} alt="" />
            </div>
            <div className="links">
              <Link className='link' to="/aidat">
                <h6>Aidat</h6>
              </Link>
              <Link className='link' to="/gider">
                <h6>Gider</h6>
              </Link>
              <Link className='link' to="/hesaplar">
                <h6>Hesaplar</h6>
              </Link>
              <span>Kullanici Adi</span>
              <span>Site Ismi</span>
              <span onClick={handleLogout}>Cikis Yap</span>
            </div>
        </div>  
    </div>
  )
}

export default Navbar