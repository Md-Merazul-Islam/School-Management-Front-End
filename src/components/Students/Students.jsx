import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000 });

    fetch('https://school-management-five-iota.vercel.app/academics/students-list/')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='py-24'>
      {/* Section Title with AOS Animation */}
      <div
        className="text-center mx-auto pb-12 "
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

      {/* Student Cards */}
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
    </div>
  );
};

export default Students;
 