import React from "react";
import "./AuthForm.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext.jsx";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AuthForm = ({ register }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { authenticatedUser, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {};

    if (register) {
      data = {
        firstname,
        lastname,
        dateofbirth,
        email,
        password,
        confirmPassword,
      };
    } else {
      data = {
        email,
        password,
      };
    }

    axios
      .post(register ? "/api/auth/register" : "/api/auth/login", data)
      .then((res) => {
        // console.log(res.data);
        authenticatedUser();
        register
          ? toast.success("Inscription réussie !")
          : toast.success("Connexion réussie !");
      })
      .catch((err) => {
        console.log(err);

        if (err?.response?.data) {
          setErrors(err.response.data);
          console.log(errors);
        }
      });
  };

  return (
    <div className="auth">
      <h1 className="auth__logo">TodoApp</h1>
      <div className="auth__container">
        <div className="auth__title">
          <h2>{register ? "Inscription" : "Connexion"}</h2>
        </div>

        <form onSubmit={onSubmit}>
          {register && (
            <>
              <div className="auth__group">
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                {errors.lastname && (
                  <p className="auth__errors">{errors.lastname}</p>
                )}
              </div>
              <div className="auth__group">
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                {errors.firstname && (
                  <p className="auth__errors">{errors.firstname}</p>
                )}
              </div>
              <div className="auth__group">
                <label htmlFor="dateOfBirth">Date de naissance</label>
                <input
                  type="date"
                  value={dateofbirth}
                  onChange={(e) => setDateofbirth(e.target.value)}
                />
                {errors.dateofbirth && (
                  <p className="auth__errors">{errors.dateofbirth}</p>
                )}
              </div>
            </>
          )}
          <div className="auth__group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="auth__errors"> {errors.email}</p>}
          </div>
          <div className="auth__group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="auth__errors">{errors.password}</p>
            )}
          </div>
          {register && (
            <div className="auth__group">
              <label htmlFor="confirmpassword">
                Confirmez votre mot de passe
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="auth__errors">{errors.confirmPassword}</p>
              )}
            </div>
          )}
          <div className="auth__errors">
            {!register && <>{errors.message}</>}
          </div>
          <div className="auth__bottom">
            <button type="submit">
              {register ? "S'inscrire" : "Se connecter"}
            </button>
          </div>
          <div className="auth__link">
            {register ? (
              <p>
                Déja membre ? <Link to="/login">Connexion</Link>
              </p>
            ) : (
              <p>
                Pas encore membre ? <Link to="/register">Inscription</Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
