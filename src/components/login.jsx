import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import logoUrl from "../assets/imgs/logos/logo.png";
import "../assets/css/login.css";

const images = [
  "Calubian-leyte.png",
  "Malitbog-bukidon.png",
  "San Ildefonso-ilocos sur.png",
  "Santa Lucia-Ilocos Sur.png",
  "Sugbongcogon-Misamis Oriental.png",
  "bantayan-ilocos sur.png",
  "bato-leyte.png",
  "burgos-ilocos norte.png",
  "cabanglasan-bukidnon.png",
  "cavinti-laguna.png",
  "cervantes-ilocos sur.png",
  "dangcagan-bukidnon.png",
  "dingras-ilocos norte.png",
  "hilongos-leyte.png",
  "ilocos sur-buagi falls.png",
  "jaro-leyte.png",
  "kalilangan-bukidnon.png",
  "kibawe-bukidnon.png",
  "la trinidad-benguet.png",
  "magsaysay-occidental mindoro.png",
  "magsaysay-occidental mindoro2.png",
  "manolo-bukidnon.png",
  "opol-mis or.png",
  "pagudpud-ilocos norte.png",
  "pangantucan-bukidnon.png",
  "sablayan-occidental mindoro.png",
  "san esteban-ilocos sur.png",
  "santa cruz-ilocos Sur.png",
  "silago-southern leyte.png",
  "talakag-bukidnon.png",
  "tuba-benguet.png",
  "valencia-bukidnon.png",
];

const Login = () => {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const passRef = useRef();
  const navigate = useNavigate();

  const [leftImageStyle, setLeftImageStyle] = useState({});

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

  // Set random background image
  useEffect(() => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const styles = {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundImage: `url("/imgs/login-page/${randomImage}")`,
    };

    setLeftImageStyle(styles);
  }, []);

  return (
    <>
      <div className="container-login">
        <div className="column bg-login" style={leftImageStyle}></div>

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
