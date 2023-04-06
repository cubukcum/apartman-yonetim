import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Aidat from './pages/Aidat'
import Gider from './pages/Gider'
import Login from './pages/Login'
import Register from './pages/Register'
import Hesaplar from './pages/Hesaplar'
import Sakin from './pages/Sakin'
import Home from './pages/Home'
import Header from "./Components/Header";
import Navbar from './Components/Navbar'
import "./style.scss"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Header />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Aidat",
        element: <Aidat />
      },
      {
        path: "/Gider",
        element: <Gider />
      },
      {
        path: "/Hesaplar",
        element: <Hesaplar />
      },
    ]
  },
  {
    path: "/aidat",
    element: <Aidat />,
  },
  {
    path: "/gider",
    element: <Gider />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/hesaplar",
    element: <Hesaplar />,
  },
  {
    path: "/sakin",
    element: <Sakin />,
  }
]);

function App() {
  return (
    <div className="app" >
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
