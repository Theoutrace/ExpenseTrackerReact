import React, { useRef, useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const[resp,setResp]=useState(false)
  const forgotPassOfMailRef =useRef()

  const forgotPassFormSubmithandler = (e)=>{
    e.preventDefault()
    const enteredEmail = forgotPassOfMailRef.current.value

    setResp(true)
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC4NwKi-WNuGvMdl2_U3M7motBl31iKQO4',{
      method: 'POST',
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: enteredEmail
      }),
      headers: {'Content-Type':'application/json'}
    }).then(res=>{
      if(res.ok){
        return res.json().then(data=>{
          // console.log(data);
          setResp(false)
        })
      }
    })

  }

  return (
    <div className="forgot-conponent-container">
      <div className="forgot-form-container">
      {resp && <div>Loading...</div>}
      {!resp && <form onSubmit={forgotPassFormSubmithandler}>
        <div className="text-enter-mail-container">Enter the registered email</div>
          <input type='email' placeholder="Email" ref={forgotPassOfMailRef} required/>
          <div className="forgot-form-btn-container">
            <button>Send link</button>
          </div>
        </form>}

        <div className="have-an-account-option-container">Already a user? <button>Login</button></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
