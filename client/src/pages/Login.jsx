import React, { useState } from "react";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";

import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch("http://localhost:4001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      /* Get data after fetching */
      const loggedIn = await response.json();

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");
      } else {
        console.log(loggedIn?.message);
      }
    } catch (err) {
      console.log("Login failed", err.message);
    } finally {
      setLoader(false);
    }
  };
  const notify = () => toast("This is a toast notification !");
  return (
    <div className="login">
      {loader ? (
        <Loader />
      ) : (
        <div className="login_content">
          <form
            action=""
            className="login_content_form"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <button type="submit">LOGIN</button>
          </form>

          <a href="/register">Don't Have an account? please register </a>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
