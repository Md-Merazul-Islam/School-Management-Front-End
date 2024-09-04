import React, { useEffect, useState } from 'react';
import { AcademicCapIcon, CurrencyDollarIcon, ChartBarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Fetching data from the API
    fetch('https://amader-school.up.railway.app/academics/subjects/')
      .then(response => response.json())
      .then(data => setSubjects(data))
      .catch(error => console.error('Error fetching subjects:', error));
  }, []);

  // Mapping subject slugs to icons
  const iconMapping = {
    'computer-science': <AcademicCapIcon className="w-36 h-36 mt-6 m-auto text-gray-700" />,
    'economics': <CurrencyDollarIcon className="w-36 h-36 mt-6 m-auto text-gray-700" />,
    'marketing': <ChartBarIcon className="w-36 h-36 mt-6 m-auto text-gray-700" />,
    'finance': <BriefcaseIcon className="w-36 h-36 mt-6 m-auto text-gray-700" />,
  };

  return (
    <section className=" py-24 px-4 lg:px-16 min-h-screen z-10 relative">
      <div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2">
        {/* <h1 className="text-center text-5xl pb-12">Subjects </h1> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16">
          {/* Dynamically render the subjects */}
          {subjects.map((subject, index) => (
            <div key={index} className="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <a href="#" className="block">
                <div className="h-28">
                  <div
                    className="absolute -top-20 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-48 bg-gray-100 rounded-xl justify-items-center align-middle">
                    {/* Render icon based on subject slug */}
                    {iconMapping[subject.slug] || <AcademicCapIcon className="w-36 h-36 mt-6 m-auto text-gray-700" />}
                  </div>
                </div>
                <div className="p-6 z-10 w-full">
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
