import "./Login.css";
import React from "react";
import LoginForm from "../LoginForm/LoginForm";

import mainLogo from "../../assets/logo/logo.svg";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
    if (localStorage.getItem("token")) window.location.href = "/";
  }

  render() {
    return (
      <div className="main">
        <LoginForm />

        <img id="logoMain" src={mainLogo} />
      </div>
    );
  }
}

export default Login;
