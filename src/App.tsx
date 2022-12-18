import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePages from "./pages/HomePages";
import useAuth from "./hooks/useAuth";
import LoginPages from "./pages/LoginPages";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar";
import RegisterPages from "./pages/RegisterPages";
import BattlePages from "./pages/BattlePages";
import useNavbar from "./hooks/useNavbar";
function App() {
  const { isAuthenticated } = useAuth();
  const { isHidden } = useNavbar()

  const RenderIsAuthComponent = (
    ComponentIsAuth: React.FC<{}>
  ): React.ReactNode => {
    return isAuthenticated ? (
      <ComponentIsAuth />
    ) : (
      <Navigate to={"/auth/login"} />
    );
  };

  return (
    <Router>
      <Notification />
      {isAuthenticated && !isHidden && <Navbar/>}
      <Routes>
        <Route path="/" element={RenderIsAuthComponent(HomePages)} />
        <Route path="/battle" element={RenderIsAuthComponent(BattlePages)} />
        <Route
          path="/auth/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPages />}
        />
        <Route
          path="/auth/register"
          element={isAuthenticated ? <Navigate to="/" /> : <RegisterPages />}
        />
      </Routes>
    </Router>
  );
}

export default App;
