import React, { useState } from 'react';

const Result = () => {
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [students, setStudents] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://amader-school.up.railway.app/academics/students-list/?first_name=${firstName}&username=${username}&roll_no=${rollNo}`
      );
      const fetchedStudents = await response.json();

      // Calculate GPA and Grade based on 4.0 scale
      const updatedStudents = fetchedStudents.map((student) => {
        if (student.marksheet.length === 0) {
          return { ...student, status: 'No marksheet available', final_gpa: null, final_grade: null };
        }

        const failedSubject = student.marksheet.some((subject) => subject.grade === 'F');
        if (failedSubject) {
          return { ...student, status: 'Failed', final_gpa: null, final_grade: null };
        }

        const totalGPA = student.marksheet.reduce((sum, subject) => {
          let subjectGPA = 0;

          // GPA calculation on a 4.0 scale based on marks
          if (subject.marks >= 80) {
            subjectGPA = 4.0; // A+
          } else if (subject.marks >= 70) {
            subjectGPA = 3.75; // A
          } else if (subject.marks >= 60) {
            subjectGPA = 3.5; // B+
          } else if (subject.marks >= 50) {
            subjectGPA = 3.0; // B
          } else {
            subjectGPA = 2.5; // C
          }

          return sum + subjectGPA;
        }, 0);

        const averageGPA = totalGPA / student.marksheet.length;
        let finalGrade = '';

        if (averageGPA >= 4.0) {
          finalGrade = 'A+';
        } else if (averageGPA >= 3.75) {
          finalGrade = 'A';
        } else if (averageGPA >= 3.5) {
          finalGrade = 'B+';
        } else if (averageGPA >= 3.0) {
          finalGrade = 'B';
        } else {
          finalGrade = 'C';
        }

        return {
          ...student,
          status: `Passed `,
          final_gpa: averageGPA.toFixed(2),
          final_grade: finalGrade,
        };
      });

      setStudents(updatedStudents);
    } catch (error) {
      console.error('Error fetching student data', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Search for Students</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        /> */}
        <input
          type="text"
          placeholder="Please enter your Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Search
        </button>
      </form>

      {/* Results */}
      {students.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {students.map((student) => (
            <div key={student.roll_no} className="p-4 rounded-md shadow-md bg-white">
              <div className="flex items-center space-x-4">
                <img
                  src={student.photo}
                  alt={student.first_name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold">{student.first_name} {student.last_name}</h2>
                  <p className="text-gray-600">@{student.username}</p>
                  <p className="text-gray-600">Roll No: {student.roll_no}</p>
                  
                  {/* Status line with dynamic background */}
                  <p
                    className={`mt-2 text-white font-semibold px-2 py-1 rounded-md ${
                      student.status.includes('Passed') ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {student.status}
                  </p>
                </div>
              </div>
              
              {/* Marksheet */}
              {student.marksheet && student.marksheet.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold">Marksheet</h3>
                  <table className="w-full text-left mt-2">
                    <thead>
                      <tr>
                        <th className="border-b p-2">Subject</th>
                        <th className="border-b p-2">Grade</th>
                        <th className="border-b p-2">Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.marksheet.map((subject, idx) => (
                        <tr key={idx}>
                          <td className="border-b p-2">{subject.subject_name}</td>
                          <td className="border-b p-2">{subject.grade}</td>
                          <td className="border-b p-2">{subject.marks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Result Summary */}
              {student.final_gpa && student.final_grade ? (
                <div className="mt-4">
                  <p className="text-lg font-semibold">
                    Final GPA: {student.final_gpa} <span>(Out Of 4)</span> <br /> Final Grade: {student.final_grade}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 mt-4">No GPA or grade data available</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No students found</p>
      )}
    </div>
  );
};

export default Result;
