import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import ExpensePage from "./pages/ExpensePage";
import ForgotPassword from "./pages/ForgotPassword";
import LoginSignup from "./pages/LoginSignup";
import Profile from "./pages/Profile";
import WelcomePage from "./pages/WelcomePage";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <div>
        <Header />
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {!isAuth && <Route path="/login" element={<LoginSignup />} />}
        {isAuth && <Route path="/expenses" element={<ExpensePage />} />}
        {!isAuth && (
          <Route path="/expenses" element={<Navigate to="/login" />} />
        )}
        {isAuth && <Route path="/welcome" element={<WelcomePage />} />}
        {isAuth && <Route path="/profile" element={<Profile />} />}
        {!isAuth && (
          <Route path="/welcome" element={<Navigate to="/login" />} />
        )}
        {!isAuth && (
          <Route path="/forgot-password" element={<ForgotPassword />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
