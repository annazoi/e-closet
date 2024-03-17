import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import Closet from "./pages/closet";
import CreateOutfit from "./pages/closet/CreateOutfit";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/closet" element={<Closet />} />
            <Route path="/closet/create-outfit" element={<CreateOutfit />} />
          </Routes>
        </NavigationBar>
      </BrowserRouter>
    </>
  );
}

export default App;
