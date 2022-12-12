import React from "react";
import Header from "./Header/Header.jsx";
import Home from "../Pages/Home/Home.jsx";
import AuthForm from "../Pages/Auth/AuthForm.jsx";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../Hooks/useAuthContext.jsx";
import Loader from "../Components/Loader/Loader.jsx";
import "./Layout.scss";
import Account from "../Pages/Account/Account.jsx";

const Layout = () => {
  const { loading } = useAuthContext();
  return loading ? (
    <Loader />
  ) : (
    <div className="Layout">
      <ToastContainer autoClose={4000} />
      <Header />
      <div className="container">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm register />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
