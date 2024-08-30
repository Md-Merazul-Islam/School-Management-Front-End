import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SingUp from "./components/SingUp/SingUp";
import Login from "./components/Login/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup/" element={<SingUp />} />
        <Route path="login/" element={<Login />} />

        {/* <Route path="/" element={<Home />} />
        <Route path="/" element={<About />} />
        <Route path="/" element={<Projects />} />
        <Route path="/" element={<Services />} />
        <Route path="/" element={<Resume />} />
        <Route path="/" element={<Contact />} />
        <Route path="/" element={<Home />} /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
