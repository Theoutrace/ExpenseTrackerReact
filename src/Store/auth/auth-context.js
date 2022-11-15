import React, { useEffect, useState } from "react";

// creating auth context
const AuthContext = React.createContext({
    token: '',
    email: '',
    isLoggedIn: false,
    login: (token)=>{},
    logout: ()=>{}
})

// auth context provider function
// export const AuthContextProvider = (props)=>{
//     const initialToken = localStorage.getItem('token')
//     const [token, setToken] = useState(initialToken)
//     const [email, setEmail] = useState('')


//     const userIsLoggedIn = !!token

//     useEffect(()=>{
//         // console.log(token);
//         if(token){
//             fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC4NwKi-WNuGvMdl2_U3M7motBl31iKQO4',{
//                 method: 'POST',
//                 body:JSON.stringify({
//                     idToken: token
//                 }),
//                 headers: {'Content-Type': 'application/json'}
//             }).then((res)=>res.json().then(data=>{
//                 // console.log(data.users[0].email);
//                 setEmail(()=>data.users[0].email)
//             }))

//         }

//     },[token])

    const loginHandler = (token)=>{
        localStorage.setItem('token', token)
        setToken(token)
        // console.log('User has successfully signed up');
    }

    const logoutHandler = ()=>{
        localStorage.removeItem('token')
        setToken(null)
    }



    // value which is passed in context to every child
    const contextValue = {
        token: token,
        email: email,
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