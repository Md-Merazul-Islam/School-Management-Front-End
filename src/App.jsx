import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
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
import Result from "./components/Result/Result";
import Admin from "./components/Admin/Admin";
import AdTeacher from "./components/AdminPanel/AdTeacher";
import AdStudents from "./components/AdminPanel/AdStudents";
import AdNotices from "./components/AdminPanel/AdNotices";
import { AdCourse } from "./components/AdminPanel/AdCourse";
import AdResult from "./components/AdminPanel/AdResult";
import AdUser from "./components/AdminPanel/AdUser";
import AdNotification from "./components/AdminPanel/AdNotification";
import AdAttendance from "./components/AdminPanel/AdAttendance";
import TestimonialCarousel from "./components/TestimonialCarousel/TestimonialCarousel";
import AllReviews from "./components/AllReviews/AllReviews";


function App() {
  const location = useLocation();

  const hideNavFooterRoutes = ["/admin"];
  const isAuthenticated = localStorage.getItem("token");

  const shouldHideNavFooter = hideNavFooterRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div>
      {!shouldHideNavFooter && <Navbar />}

      <Routes>
        {/* Catch-all route for 404 page */}
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="result/" element={<Result />} />
            <Route path="teachers/" element={<Teacher />} />
            <Route path="students/" element={<Students />} />
            <Route path="about/" element={<About />} />
            <Route path="courses/" element={<Subjects />} />
            <Route path="contact/" element={<Contact />} />
            <Route path="notice/" element={<Notices />} />
            <Route path="activities/" element={<Activities />} />
            <Route path="profile/" element={<Profile />} />
            <Route path="reviews/" element={<TestimonialCarousel />} />
            <Route path="allReviews/" element={<AllReviews />} />
            <Route path="/reviews/edit/:id" element={<TestimonialCarousel />} />

            {/* Admin Sub-Routes */}
            <Route path="admin/" element={<Admin />} />
            <Route path="/admin/teachers/" element={<AdTeacher />} />
            <Route path="/admin/students/" element={<AdStudents />} />
            <Route path="/admin/notices/" element={<AdNotices />} />
            <Route path="/admin/course/" element={<AdCourse />} />
            <Route path="/admin/notification/" element={<AdNotification />} />
            <Route path="/admin/result/" element={<AdResult />} />
            <Route path="/admin/users/" element={<AdUser />} />
            <Route path="/admin/attendance/" element={<AdAttendance />} />
            <Route path="/admin/students/edit/:id" element={<AdStudents />}/>
            <Route path="/admin/teachers/edit/:id" element={<AdStudents />}/>

            
            
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="signup/" element={<SingUp />} />
            <Route path="login/" element={<Login />} />
            <Route path="about/" element={<About />} />
            <Route path="courses/" element={<Subjects />} />
            <Route path="contact/" element={<Contact />} />
            <Route path="notice/" element={<Notices />} />
            <Route path="allReviews/" element={<AllReviews />} />
            
          </>
        )}
        <Route path="*" element={<Home />} />
      </Routes>
      {!shouldHideNavFooter && <Footer />}
    </div>
  );
}

export default App;
