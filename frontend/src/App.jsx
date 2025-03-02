import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx"; // Import UserProvider
import Header from "./components/Header";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Invite from "./pages/Invite"; 

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <UserProvider> {/* UserProvider should wrap everything inside Router */}
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/invite" element={<Invite />} />
      </Routes>
    </UserProvider>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
