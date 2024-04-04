import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Home from "./pages/home";
import Closet from "./pages/closet";
import CreateOutfit from "./pages/closet/CreateOutfit";
import About from "./pages/about";
import { authStore } from "./store/authStore";

function App() {
  const { isLoggedIn } = authStore((state) => state);
  return (
    <>
      <BrowserRouter>
        <NavigationBar>
          <Routes>
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/closet" element={<Closet />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
            </>
          </Routes>
        </NavigationBar>
      </BrowserRouter>
    </>
  );
}

export default App;
