import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth/auth-context";
import "./Signup.css";

const Signup = (props) => {
  const [checkPass, setCheckPass] = useState("");
  // get context
  const authCtx = useContext(AuthContext);
  // console.log(authCtx);
  const history = useNavigate();

  const URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4NwKi-WNuGvMdl2_U3M7motBl31iKQO4";

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    const enteredConfirmPassword = inputConfirmPasswordRef.current.value;


    // check if password === confirmed password else alert not matched
    if (enteredPassword !== enteredConfirmPassword) {
      setCheckPass("pass-didnt-match");
      alert("Password didn't match");
    } else {
      setCheckPass("");
      //send this data for signup
      fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            authCtx.login(data.idToken);
            history("/home");
          });
        } else {
          const errorMsg = "Authentication Failed";
          alert(errorMsg);
        }
      });

      // receive token and pass to login in context
    }
  };

  //---------------------------------------------------------------------------------------------------------
  const loginSignupToggleHandler = () => {
    props.onToggle();
  };

  return (
    <div className="signup-conponent-container">
      <div className="signup-form-container">
        <form onSubmit={formSubmitHandler}>
          <div className="signup-text-heading">SignUp</div>
          <input
            type="email"
            placeholder="Email"
            required
            ref={inputEmailRef}
          />
          <input
            type="password"
            placeholder="Password"
            required
            ref={inputPasswordRef}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={checkPass}
            required
            ref={inputConfirmPasswordRef}
          />
          <div className="signup-form-btn-container">
            <button>Sign up</button>
          </div>
        </form>
        <div className="have-an-account-option-container">
          <div className="have-an-account-text-n-btn-container">
            Have an account?{" "}
            <button onClick={loginSignupToggleHandler}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
