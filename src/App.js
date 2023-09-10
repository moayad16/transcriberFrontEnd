import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import MainCont from "./pages/js/mainCont";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/js/login";
import Signup from "./pages/js/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainCont />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
