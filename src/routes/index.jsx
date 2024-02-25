import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn/index";
import SignUp from "../pages/SignUp/index";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Private from "./Private";
import CreateProduct from "../pages/CreateProduct";
import Reservation from "../pages/Reservations";
import HomePage from "../pages/HomePage";
import VerdurasProduct from "../pages/ListProduct";


const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/verduras" element={<VerdurasProduct filtro="verdura"/>} />
      <Route path="/legumes" element={<VerdurasProduct filtro="legume"/>} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      <Route
        path="/profile"
        element={
          <Private>
            <Profile />
          </Private>
        }
      />
      <Route
        path="/criar"
        element={
          <Private>
            <CreateProduct />
          </Private>
        }
      />
      <Route
        path="/criar/:id"
        element={
          <Private>
            <CreateProduct />
          </Private>
        }
      />
      <Route
        path="/reservas"
        element={
          <Private>
            <Reservation />
          </Private>
        }
      />
    </Routes>
  );
};

export default RoutesApp;
