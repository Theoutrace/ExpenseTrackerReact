import React, { Fragment, useContext} from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/auth/auth-context";
import "./WelcomePage.css";

const WelcomePage = () => {
  const authCtx=useContext(AuthContext)

  const history = useNavigate()
  const completeProfileNowhandler = ()=>{
    history('/profile')
  }


  const verifyMailHandler = ()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC4NwKi-WNuGvMdl2_U3M7motBl31iKQO4',{
      method: 'POST',
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: authCtx.token
      }),
      headers: {'Content-Type': 'application/json'}
    }).then(res=>{
        res.json().then(data=>{
          if(data.error){
            const errorMsg = data.error.errors[0].message
            alert(errorMsg)
          }
        })
    })
  }


  return (
    <Fragment>
    <div className="welcome-component">
      <div className="welcome-txt-welcome-page">Welcome to Expense Tracker</div>
      <div className="profile-complete-txt">
        Your profile is incomplete.<button onClick={completeProfileNowhandler}>Complete now</button>
      </div>
    </div>
    <div className="under-welcome-msg-component-verify-btn-container">
        <button onClick={verifyMailHandler}>Verify Your Email</button>
      </div>
    </Fragment>
  );
};

export default WelcomePage;
