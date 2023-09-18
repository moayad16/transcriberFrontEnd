import React from "react";
import "../css/login.css";
import LeftCol from "../../components/js/leftCol";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import "animate.css";
// import { ax } from "../../utils/requestTemplate";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Spinner from "../../components/js/spinner";
import requestTemplate from "../../utils/requestTemplate";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [width, setWidth] = useState(window.innerWidth);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const submit = async () => {
    setLoading(true);

    const rt = new requestTemplate(null);
    const ax = await rt.getRequestTemplate();

    await ax
      .post("/auth/login", loginInfo)
      .then((res) => {
        Cookies.set("token", res.data, { expires: 1 });
        rt.setToken(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  };

  return (
    <div className="login">
      <div className="row">
        <LeftCol />
        <div
          className={`right animate__animated ${
            width < 1006
              ? "col-lg-12 animate__fadeInUp"
              : "col-lg-6 animate__fadeInRight"
          }`}
        >
          <h1>Welcome Back</h1>
          <p>
            Don’t have an account? <Link to="/signup">Sing Up</Link>
          </p>
          <input
            type="email"
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
            placeholder="Password"
          />
          <h2
            style={error ? { display: "block" } : { display: "none" }}
            className="error"
          >
            Invalid Email Or Password
          </h2>
          <h2>Forgot Password?</h2>
          {loading ? (
            <button onClick={submit} className="btn btn-primary">
              <Spinner />
            </button>
          ) : (
            <button onClick={submit} className="btn btn-primary">
              Login
            </button>
          )}
          <div className="separator">
            <hr />
            <p>or</p>
            <hr />
          </div>
          <button className="btn btn-secondary">
            <FontAwesomeIcon
              style={{ marginRight: "0.62rem" }}
              icon={faGoogle}
            />
            Continue with Google
          </button>
          <button className="btn btn-secondary no-margin-bottom">
            <FontAwesomeIcon
              style={{ marginRight: "0.63rem" }}
              icon={faApple}
            />
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
}
