import React, { useState } from "react";

// creating auth context
const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token)=>{},
    logout: ()=>{}
})

// auth context provider function
export const AuthContextProvider = (props)=>{
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)


    const userIsLoggedIn = !!token

    const loginHandler = (token)=>{
        localStorage.setItem('token', token)
        setToken(token)
        console.log('User has successfully signed up');
    }

    const logoutHandler = ()=>{
        localStorage.removeItem('token')
        setToken(null)
    }



    // value which is passed in context to every child
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }


    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext