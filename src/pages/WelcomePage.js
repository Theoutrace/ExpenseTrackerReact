import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const history = useNavigate()
  const completeProfileNowhandler = ()=>{
    history('/profile')
  }
  return (
    <div className="welcome-component">
      <div className="welcome-txt-welcome-page">Welcome to Expense Tracker</div>
      <div className="profile-complete-txt">
        Your profile is incomplete.<button onClick={completeProfileNowhandler}>Complete now</button>
      </div>
    </div>
  );
};

export default WelcomePage;
