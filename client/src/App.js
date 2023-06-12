import { Routes, Route } from "react-router-dom";
import Aidat from "./pages/Aidat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./app.css";
import Yonetici from "./pages/Yonetici";
import Navbar from "./Components/Navbar";
import Gider from "./pages/Gider";
import Hesaplar from "./pages/Hesaplar";
import Sakin from "./pages/Sakin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Yonetici />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aidat" element={<Aidat />} />
        <Route path="/gider" element={<Gider />} />
        <Route path="/hesaplar" element={<Hesaplar />} />
        <Route path="/sakin" element={<Sakin />} />
      </Routes>
    </>
  );
}

export default App;
