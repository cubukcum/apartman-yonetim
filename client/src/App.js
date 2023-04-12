import { Routes, Route } from "react-router-dom";
import Aidat from "./pages/Aidat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./app.css";
import Yonetici from "./pages/Yonetici";
import Navbar from "./Components/Navbar";

// const Layout = () => {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//       <Header />
//     </>
//   );
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/Aidat",
//         element: <Aidat />,
//       },
//       {
//         path: "/Gider",
//         element: <Gider />,
//       },
//       {
//         path: "/Hesaplar",
//         element: <Hesaplar />,
//       },
//     ],
//   },
//   {
//     path: "/aidat",
//     element: <Aidat />,
//   },
//   {
//     path: "/gider",
//     element: <Gider />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/hesaplar",
//     element: <Hesaplar />,
//   },
//   {
//     path: "/sakin",
//     element: <Sakin />,
//   },
// ]);

function App() {
  return (
    // <div className="app">
    //   <div className="container">
    //     <RouterProvider router={router} />
    //   </div>
    // </div>
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Yonetici />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aidat" element={<Aidat />} />
      </Routes>
    </>
  );
}

export default App;
