import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
  
    fetch('https://school-management-five-iota.vercel.app/academics/subjects/')
      .then(response => response.json())
      .then(data => setSubjects(data))
      .catch(error => console.error('Error fetching subjects:', error));

   
    AOS.init({
      duration: 500, 
      easing: 'ease-in-out',
      once: true,
    });

 
    AOS.refresh();
  }, []);


  const openModal = (subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

 
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubject(null);
  };

  
  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + '...';
    }
    return text;
  };

  return (
    <div>
      <div
        className="text-center mx-auto pb-12"
        style={{ maxWidth: '800px' }}
        data-aos="fade-up"
      >
          <div className='py-11'>
        <h1 className='text-2xl text-blue-500 text-center  m-auto'>All Courses</h1>
      </div>
        <h1 className="text-5xl mb-4">Empowering Your Educational Journey</h1>
        <p className="mb-0 mx-1">
          Our institution is committed to providing a supportive and challenging environment that encourages students to achieve their full potential. Discover the features that make our school, college, or university a leader in education.
        </p>
      </div>

   

      <section className="px-4 lg:px-16 mb-24 min-h-screen z-10 relative">
        <div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1536px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16">
            {/* Dynamically render the subjects */}
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="relative group h-48 my-20 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
                data-aos="fade-up" // Add AOS animation
              >
                <a href="#" className="block">
                  <div className="h-28">
                    <div
                      className="absolute -top-20 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-48 bg-gray-100 rounded-xl justify-items-center align-middle mb-6"
                    >
                      {/* Render image from API */}
                      <img
                        src={subject.photo}
                        alt={subject.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="p-6 z-10 w-full">
                    <p className="mb-4 text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
                      {subject.name}
                    </p>
                    <p className="mb-2 text-center">{subject.code}</p>
                    {/* Truncated description with "Read more" */}
                    <p className="mb-4 text-center">
                      {truncateText(subject.description, 100)}
                      {subject.description.length > 100 && (
                        <span
                          onClick={() => openModal(subject)}
                          className="text-blue-500 cursor-pointer"
                        >
                          {' '}Read more
                        </span>
                      )}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Modal */}
<Transition appear show={isModalOpen} as={Fragment}>
  <Dialog as="div" className="relative z-10" onClose={closeModal}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
    </Transition.Child>

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {selectedSubject?.name}
            </Dialog.Title>
            <div className="mt-4">
              {/* Render the selected subject's photo */}
              {selectedSubject?.photo && (
                <img
                  src={selectedSubject.photo}
                  alt={selectedSubject.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <p className="text-sm text-gray-500">
                {selectedSubject?.description}
              </p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition>

    </div>
  );
};

export default Subjects;
