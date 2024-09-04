import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AcademicCapIcon, CurrencyDollarIcon, ChartBarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Fetching data from the API
    fetch('https://amader-school.up.railway.app/academics/subjects/')
      .then(response => response.json())
      .then(data => setSubjects(data))
      .catch(error => console.error('Error fetching subjects:', error));
      
    // Initialize AOS
    AOS.init({
      duration: 1200,
    });
  }, []);

  // Mapping subject slugs to icons
  const iconMapping = {
    'computer-science': <AcademicCapIcon className="w-36 h-36 mt-6 m-auto text-gray-700" />,
    'economics': <CurrencyDollarIcon className="w-36 h-36 mt-6 m-auto text-gray-700" />,
    'marketing': <ChartBarIcon className="w-36 h-36 mt-6 m-auto text-gray-700" />,
    'finance': <BriefcaseIcon className="w-36 h-36 mt-6 m-auto text-gray-700" />,
  };

  return (
    <section className="bg-white py-24 px-4 lg:px-16 min-h-screen">
      <div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16">
          {/* Dynamically render the subjects */}
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
              data-aos="fade-up" // Add AOS animation here
            >
              <a href="#" className="block">
                <div className="h-28">
                  <div
                    className="absolute -top-20 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-48 bg-gray-100 rounded-xl justify-items-center align-middle"
                    data-aos="zoom-in" // Add AOS animation here
                  >
                    {/* Render icon based on subject slug */}
                    {iconMapping[subject.slug] || <AcademicCapIcon className="w-36 h-36 mt-6 m-auto text-gray-700" />}
                  </div>
                </div>
                <div className="p-6 z-10 w-full" data-aos="fade-up">
                  <p className="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
                    {subject.name}
                  </p>
                  <p className="text-center">{subject.code}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subjects;
