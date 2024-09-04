import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Teacher.css"; // Import your custom CSS
import { TERipple } from "tw-elements-react";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetching teachers' data from the API
    fetch("https://amader-school.up.railway.app/academics/teachers/")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({ duration: 1200 }); // You can adjust the duration

    // Initialize the Glide.js carousel only if teachers data is loaded
    if (teachers.length > 0) {
      const config = {
        type: "carousel",
        startAt: 0,
        perView: 4, // Show 4 cards per view
        autoplay: 2000, // Auto-slide every 2 seconds
        gap: 32,
        hoverpause: true, // Pause autoplay on hover
        breakpoints: {
          1280: {
            perView: 4,
          },
          1024: {
            perView: 3,
          },
          768: {
            perView: 2,
          },
          640: {
            perView: 1,
          },
        },
      };
      const glide = new Glide(".glide", config);
      glide.mount();

      // Cleanup on component unmount
      return () => glide.destroy();
    }
  }, [teachers]);

  return (
    <div className="teacher-section">
      <div className="flex h-screen justify-center items-center">
        <div className="glide max-w-[1680px] px-4 py-8 rounded-3xl">
          <div
            className="text-center mx-auto pb-12"
            style={{ maxWidth: "800px" }}
            data-aos="fade-up"
          >
            <h4 className="text-blue-500">Meet Our Teachers</h4>
            <h1 className="text-5xl mb-4">
              Inspiring and Guiding the Next Generation
            </h1>
            <p className="mb-0">
              Our dedicated teachers are the cornerstone of our educational
              mission, fostering a nurturing and stimulating environment where
              students can excel. Learn more about the passionate educators who
              are committed to your academic and personal growth.
            </p>
          </div>

          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {teachers.map((teacher, index) => (
                <li
                  className="glide__slide"
                  key={teacher.id}
                  data-aos="zoom-in"
                  data-aos-delay={`${index * 100}`} // Delay each card animation slightly
                >
                  <div className="block rounded-lg bg-white shadow-lg dark:bg-gray-800 text-dark">
                    <a href="#!">
                      <img
                        className="rounded-t-lg w-full h-64 object-cover"
                        src={teacher.photo} // Use the teacher's photo from the API
                        alt={`${teacher.first_name} ${teacher.last_name}`}
                      />
                    </a>
                    <div className="p-6">
                      <h5 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-gray-50">
                        {teacher.first_name} {teacher.last_name}
                      </h5>
                      <p className="mb-4 text-base text-gray-600 dark:text-gray-200">
                        Employee ID: {teacher.employee_id}
                      </p>
                      <p className="mb-4 text-base text-gray-600 dark:text-gray-200">
                        Subject: {teacher.subject_name}
                      </p>
                      <p className="mb-4 text-base text-gray-600 dark:text-gray-200">
                        {teacher.email}
                      </p>
                      <TERipple>
                        <a
                          href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${teacher.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button
                            type="button"
                            className="inline-block rounded bg-purple-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-700 focus:bg-purple-700 focus:shadow-lg focus:outline-none active:bg-purple-800"
                          >
                            Contact
                          </button>
                        </a>
                      </TERipple>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glide__arrows" data-glide-el="controls">
            <button
              className="glide__arrow glide__arrow--left left-4"
              data-glide-dir="<"
            >
              <div className="h-12 w-12 bg-indigo-600 rounded-xl flex justify-center items-center hover:bg-indigo-400 duration-300 ease-in-out">
                <i className="fas fa-angle-left text-white text-2xl"></i>
              </div>
            </button>
            <button
              className="glide__arrow glide__arrow--right right-4"
              data-glide-dir=">"
            >
              <div className="h-12 w-12 bg-indigo-600 rounded-xl flex justify-center items-center hover:bg-indigo-400 duration-300 ease-in-out">
                <i className="fas fa-angle-right text-white text-2xl"></i>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;