import React from "react";
import "../css/signup.css";
import LeftCol from "../../components/js/leftCol";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import "animate.css";
import { ax } from "../../utils/requestTemplate";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [signupInfo, setsignupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const submit = async () => {
    const res = await ax.post("/auth/register", signupInfo).then((res) => {
        localStorage.setItem("token", res);
        navigate("/");
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="signup">
      <div className="row">
        <LeftCol />
        <div
          className={`right animate__animated ${
            width < 1006
              ? "col-lg-12 animate__fadeInUp"
              : "col-lg-6 animate__fadeInRight"
          }`}
        >
          <h1 style={{marginBottom: 0}}>Create account</h1>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <div className="row namesCont">
            <input
              className={width<1006? "col-lg-12": "col-lg-6 names"}
              type="text"
              onChange={(e) =>
                setsignupInfo({ ...signupInfo, firstName: e.target.value })
              }
              placeholder="First Name"
            />
            <input
              className={width<1006? "col-lg-12": "col-lg-6 names"}
              type="text"
              onChange={(e) =>
                setsignupInfo({ ...signupInfo, lastName: e.target.value })
              }
              placeholder="Last Name"
            />
          </div>
          <input
            type="email"
            onChange={(e) =>
              setsignupInfo({ ...signupInfo, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) =>
              setsignupInfo({ ...signupInfo, password: e.target.value })
            }
            placeholder="Password"
          />

          <h2 style={{marginBottom: 0}}>
            <input type="checkbox" className="check" />I agree to Transcriber's Terms
            of service and <Link>Privacy policy</Link>
          </h2>
          <button onClick={submit} className="btn btn-primary">Create Account</button>
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
