import React, { useState } from "react";
import Login from "../components/forms/Login";
import Signup from "../components/forms/Signup";
import './LoginSignup.css'


const LoginSignup = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleFormLoginSignup = () => {
    setShowLogin((previous) => !previous);
  };
  return (
    <div className="form-component-comtainer-in-login-signup">
      {!showLogin && <Signup onToggle={toggleFormLoginSignup} />}
      {showLogin && <Login onToggle={toggleFormLoginSignup} />}
    </div>
  );
};

export default LoginSignup;
