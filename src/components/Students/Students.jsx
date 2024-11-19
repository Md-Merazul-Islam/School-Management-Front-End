import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000 });

    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://school-management-dusky.vercel.app/academics/students/"
        );
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="py-24 max-w-[1536px] mx-auto">
      {/* Section Title */}
      <div
        className="text-center mx-auto pb-12"
        style={{ maxWidth: "800px" }}
        data-aos="fade-up"
      >
        <h4 className="text-blue-500 font-medium">Our All Students</h4>
        <h1 className="text-5xl font-bold mb-4">
          Inspiring and Guiding the Next Generation
        </h1>
        <p className="mb-0 mx-1 text-gray-700">
          Our dedicated teachers are the cornerstone of our educational mission,
          fostering a nurturing and stimulating environment where students can
          excel. Learn more about the passionate educators who are committed to
          your academic and personal growth.
        </p>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          {students.map((student) => (
            <div
              key={student.roll_no}
              className="relative w-full bg-white rounded-lg shadow-md overflow-hidden group"
              data-aos="fade-up"
            >
              {/* Student Image */}
              <img
                src={student.photo}
                alt={`${student.first_name} ${student.last_name}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                style={{ objectPosition: "top center" }}
              />

              {/* Overlay for Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white flex flex-col justify-center items-center p-4">
  <div className="text-lg font-semibold text-center">
    {student.first_name} {student.last_name}
  </div>
  <p className="text-sm text-center">
    <span className="font-medium">Class:</span> {student.class_name}
  </p>
  <p className="text-sm text-center">
    <span className="font-medium">Email:</span>{" "}
    <a
      href={`mailto:${student.email}`}
      className="text-white hover:underline"
    >
      {student.email}
    </a>
  </p>
</div>


              {/* Roll Number (Initial View) */}
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-center py-2 text-lg font-bold">
                Roll No: {student.roll_no}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CSS for Loader */}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
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
};

export default Students;
