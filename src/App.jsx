

import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SingUp from "./components/SingUp/SingUp";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Subjects from "./components/Subjects/Subjects";
import Contact from "./components/Contact/Contact";
import Teacher from "./components/Teacher/Teacher";
import Students from "./components/Students/Students";
import Profile from "./components/Profile/Profile";
import Notices from "./components/Notices/Notices";
import Activities from "./components/Activities/Activities";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Home />} />
        <Route path="signup/" element={<SingUp />} />
        <Route path="login/" element={<Login />} />
        <Route path="about/"element={<About/>}/>
        <Route path="courses/"element={<Subjects/>}/>
        <Route path="contact/"element={<Contact/>}/>
        <Route path="teachers/"element={<Teacher/>}/>
        <Route path="students/"element={<Students/>}/>
        <Route path="profile/"element={<Profile/>}/>
        <Route path="notice/"element={<Notices/>}/>
        <Route path="activities/"element={<Activities/>}/>
        

        {/* <Route path="/" element={<Home />} />
        <Route path="/" element={<About />} />
        <Route path="/" element={<Projects />} />
        <Route path="/" element={<Services />} />
        <Route path="/" element={<Resume />} />
        <Route path="/" element={<Contact />} />
        <Route path="/" element={<Home />} /> */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
