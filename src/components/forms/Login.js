import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../Store/auth/auth-context'
import './Login.css'


const Login = (props) => {
    const authCtx = useContext(AuthContext)
    const inputEmailRef = useRef()
    const inputPasswordRef = useRef()

    const history = useNavigate()

    const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4NwKi-WNuGvMdl2_U3M7motBl31iKQO4'

    const formSubmitHandler=(e)=>{
        e.preventDefault()

        const enteredEmail = inputEmailRef.current.value
        const enteredPassword = inputPasswordRef.current.value

        console.log(enteredEmail, enteredPassword);

        fetch(URL,{
            method: 'POST',
            body:JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }),
            headers:{'Content-Type': 'application/json'}
        }).then(res=>{
            if(res.ok){
                return res.json().then(data=>{
                    // console.log(data.idToken);
                    authCtx.login(data.idToken)
                    history('/welcome')

                })
            }else{
                const errorMsg = 'Authentication Failed'
                alert(errorMsg)
            }
        })


    }

    const loginSignupToggleHandler = ()=>{
        props.onToggle()
    }


  return (
    <div className="signup-conponent-container">
    <div className="signup-form-container">
      <form onSubmit={formSubmitHandler}>
        <div className="signup-text-heading">Login</div>
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
        <div className="signup-form-btn-container">
          <button>Login</button>
          <div className='forget-pass-txt-container'>Forgot password</div>
        </div>
      </form>
      <div className="have-an-account-option-container">
        <div className="have-an-account-text-n-btn-container">
          Don't have an account?{" "}
          <button onClick={loginSignupToggleHandler}>Sign Up</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login