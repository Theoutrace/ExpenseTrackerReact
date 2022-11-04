
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import WelcomePage from './pages/WelcomePage';
import AuthContext from './Store/auth/auth-context';

function App() {
  const authCtx=useContext(AuthContext)
  return (
    <div className="App">
      <div><Header/></div>
      {/* <div> */}
        <Routes>
          <Route path='/' element={<Navigate to='/home'/>}/>
          {!authCtx.isLoggedIn && <Route path='/login' element={<LoginSignup/>}/>}
          {authCtx.isLoggedIn && <Route path='/welcome' element={<WelcomePage/>}/>}
          {authCtx.isLoggedIn && <Route path='/profile' element={<Profile/>}/>}
          {!authCtx.isLoggedIn && <Route path='/welcome' element={<Navigate to='/login'/>}/>}
        </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
