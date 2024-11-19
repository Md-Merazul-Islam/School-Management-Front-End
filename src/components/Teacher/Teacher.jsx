import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Teacher.css";
import { TERipple } from "tw-elements-react";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="loader"></div>
    <style jsx>{`
      .loader {
        border: 8px solid #f3f3f3; /* Light grey */
        border-top: 8px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://school-management-dusky.vercel.app/academics/teachers/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTeachers(data);
        } else {
          console.error("Unexpected API response, expected array:", data);
          setTeachers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setTeachers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200 });

    if (teachers.length > 0) {
      const config = {
        type: "carousel",
        startAt: 0,
        perView: 4,
        autoplay: 2000,
        gap: 32,
        hoverpause: true,
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
      <div className="flex min-h-screen justify-center items-center">
        <div className="glide max-w-[1565px] px-4 py-8 rounded-3xl">
          <div
            className="text-center mx-auto pb-12"
            style={{ maxWidth: "800px" }}
            data-aos="fade-up"
          >
            <h4 className="text-blue-500">Meet Our Teachers</h4>
            <h1 className="text-5xl mb-4">
              Inspiring and Guiding the Next Generation
            </h1>
            <p className="mb-0 mx-1">
              Our dedicated teachers are the cornerstone of our educational
              mission, fostering a nurturing and stimulating environment where
              students can excel. Learn more about the passionate educators who
              are committed to your academic and personal growth.
            </p>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {teachers.length > 0 ? (
                  teachers.map((teacher, index) => (
                    <li
                      className="glide__slide"
                      key={teacher.id}
                      data-aos="zoom-in"
                      data-aos-delay={`${index * 100}`} // Delay each card animation slightly
                    >
                      <div className="block rounded-lg bg-white shadow-lg dark:bg-gray-800 text-dark">
                        <a href="#!" onClick={(e) => e.preventDefault()}>
                          <img
                            className="rounded-t-lg w-full h-70 object-cover"
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
                            Subject: {teacher.subject_name.slice(0, 32)}
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
                  ))
                ) : (
                  <p>No teachers available at the moment.</p>
                )}
              </ul>
            </div>
          )}

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
