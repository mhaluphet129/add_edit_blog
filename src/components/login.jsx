import React, { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import logoUrl from "../assets/imgs/logos/logo.png";
import "../assets/css/login.css";

const Login = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const passRef = useRef();
  const navigate = useNavigate();

  const handleLogin = () => {
    setError(null);
    (async () => {
      const { data } = await axios.post(`${appUrl}/blog/admin-login`, {
        username,
        password,
      });
      if (data.success) {
        if (data.status == 404) {
          setError("no-user");
          return;
        }

        Cookies.set("user", JSON.stringify(data.admin));
        navigate("/admin");

        return;
      } else {
        setError("wrong-pass");
        return;
      }
    })();
  };
  return (
    <>
      <div className="container-login">
        <div className="column bg-login"></div>

        <div className="column">
          <div className="inputs admin-fields">
            {error != null && (
              <div className="alert-error">
                {error == "no-user"
                  ? "Account Does not Exist"
                  : "Wrong Password"}
              </div>
            )}

            <img src={logoUrl} alt="Visitour" className="login-logo" />

            <div>
              <label htmlFor="username">Email</label>
              <input
                required
                type="text"
                name="username"
                className="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") passRef.current.focus();
                }}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                name="password"
                className="password"
                id="password"
                ref={passRef}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") handleLogin();
                }}
              />
            </div>

            <div>
              <button type="submit" onClick={handleLogin} className="button">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
