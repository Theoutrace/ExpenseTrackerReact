import React, { useContext, useRef, useState } from "react";
import "./Profile.css";
import gitIcon from "./pageImages/github.png";
import globeIcon from "./pageImages/globe.png";
import AuthContext from "../Store/auth/auth-context";

const Profile = () => {
    const authCtx = useContext(AuthContext)
    // const [imageState, setImgState]=useState('')
    // console.log(authCtx);
    const inputNameRef = useRef()
    const inputPhotoUrlRef = useRef()

    const userDetailsUpdateFormHandler = (e)=>{
        e.preventDefault()

        const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC4NwKi-WNuGvMdl2_U3M7motBl31iKQO4'

        const enteredName = inputNameRef.current.value
        const enteredPhotoUrl = inputPhotoUrlRef.current.value

        if(enteredName.length ===0 || enteredPhotoUrl.length ===0){
            alert('Fill the details please!')
            return;
        }else{
            // console.log(enteredName, enteredPhotoUrl);
            if(authCtx.token.length>0){
                fetch(URL,{
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: authCtx.token,
                        displayName: enteredName,
                        photoUrl: enteredPhotoUrl
                    }),
                    headers:{'Content-Type': 'application/json'}
                }).then(res=>{
                    if(res.ok){
                        return res.json().then(data=>{
                            console.log(data);
                            // setImgState(data.photoUrl)
                        })
                    }else{
                        const errormsg = 'Oops, Something went wrong! Try again.'
                        alert(errormsg)
                    }
                })
            }
        }


    }

  return (
    <div className="Profile-component-container">
      <div className="Profile-quote-txt-complete-txt-container">
        <div>Winners never quit, Quitters never win</div>
        <div className="complete-profile-txt-n-btn-container">
          Your profile is 64% completed. A comlete Profile has higher chances of
          landing a job. <button>Complete Now</button>
        </div>
      </div>
      <div>
        {/* <img src={imageState}></img> */}
      </div>
      <div className="contact-details-container">
        <div className="contact-details-text-form-container">
          <div className="contact-dtls-txt-cncl-btn-cntnr">
            <div className="txt-contact-details-cntner">Contact details</div>
            <div>
                <button>
                    Cancel
                </button>
            </div>
          </div>

          <form onSubmit={userDetailsUpdateFormHandler}>
            <div className="name-profile-url-both-with-icons">
              <div></div>
              <div className="icon-input-label-single">
                <img
                  className="icons-before-name-url"
                  src={gitIcon}
                  alt=""
                  width="25"
                ></img>
                <label htmlFor="full-name-idx">Full Name: </label>
                <input type="text" placeholder="Name" id="full-name-idx" ref={inputNameRef}/>
              </div>

              <div className="icon-input-label-single">
                <img
                  className="icons-before-name-url"
                  src={globeIcon}
                  alt=""
                  width="25"
                ></img>
                <label htmlFor="profile-url-pic-idx">Profile Photo URL: </label>
                <input type="text" placeholder="URL" id="profile-url-pic-idx" ref={inputPhotoUrlRef}/>
              </div>
            </div>
            <div className="user-details-submit-btn-cntnr">
              <button>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
