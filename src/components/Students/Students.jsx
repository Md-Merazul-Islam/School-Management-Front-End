import React, { useEffect, useState } from 'react';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('https://amader-school.up.railway.app/academics/students/')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {students.map(student => (
        <div key={student.roll_no} className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-blue-400">
          <div className="relative">
            <img className="w-full h-48 object-cover" src={student.photo} alt={`${student.first_name} ${student.last_name}`} />
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
            <a href={`mailto:${student.email}`} className="text-blue-500 hover:underline">Email: {student.email}</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Students;
