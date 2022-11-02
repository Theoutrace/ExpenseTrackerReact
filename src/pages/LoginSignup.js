import React, { useState } from "react";
import Login from "../components/forms/Login";
import Signup from "../components/forms/Signup";

const LoginSignup = () => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleFormLoginSignup = () => {
    setShowLogin((previous) => !previous);
  };
  return (
    <div>
      {!showLogin && <Signup onToggle={toggleFormLoginSignup} />}
      {showLogin && <Login onToggle={toggleFormLoginSignup} />}
    </div>
  );
};

export default LoginSignup;
