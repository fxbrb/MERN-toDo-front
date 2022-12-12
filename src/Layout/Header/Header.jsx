import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext.jsx";
import "./Header.scss";

const Header = () => {
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="Header">
      <div className="Header__box">
        <div className="Header__left">{user && <Link to="/">Fxb.</Link>}</div>
        <div className="Header__right">
          {user ? (
            <>
              <Link to="/account">Mon compte</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              {pathname === "/login" ? (
                <button onClick={() => navigate("/register")}>
                  Inscription
                </button>
              ) : (
                <button onClick={() => navigate("/login")}>Connexion</button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
