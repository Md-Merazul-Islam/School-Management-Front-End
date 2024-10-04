import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Step 1: Add loading state

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000 });

    const fetchStudents = async () => {
      try {
        const response = await fetch('https://school-management-five-iota.vercel.app/academics/students/');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Step 1: Set loading to false after fetch
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className='py-24 max-w-[1536px] mx-auto'>
      {/* Section Title with AOS Animation */}
      <div
        className="text-center mx-auto pb-12"
        style={{ maxWidth: "800px" }}
        data-aos="fade-up"
      >
        <h4 className="text-blue-500">Our All Students</h4>
        <h1 className="text-5xl mb-4">
          Inspiring and Guiding the Next Generation
        </h1>
        <p className="mb-0 mx-1">
          Our dedicated teachers are the cornerstone of our educational mission, fostering a nurturing and stimulating environment where students can excel. Learn more about the passionate educators who are committed to your academic and personal growth.
        </p>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : (
        // Student Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-4">
          {students.map(student => (
            <div
              key={student.roll_no}
              className="w-full bg-white rounded-lg shadow-lg hover:shadow-blue-400 overflow-hidden"
              data-aos="fade-up"
            >
              <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={student.photo}
                  alt={`${student.first_name} ${student.last_name}`}
                />
              </div>
              <div className="px-6 py-4">
                <div className="text-xl font-semibold text-gray-800">
                  {student.first_name} {student.last_name}
                </div>
                <p className="text-gray-600">Class: {student.class_name}</p>
                <p className="text-gray-600">Roll No: {student.roll_no}</p>
              </div>
              <div className="px-6 py-4">
                <span className="inline-block px-2 py-1 font-semibold text-teal-900 bg-teal-200 rounded-full">
                  {student.username}
                </span>
              </div>
              <div className="px-6 py-4">
                <a
                  href={`mailto:${student.email}`}
                  className="text-blue-500 hover:underline"
                >
                  Email: {student.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* CSS for loader */}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Students;
