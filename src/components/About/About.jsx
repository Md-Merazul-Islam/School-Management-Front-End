import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a 1-second duration and only once
  }, []);

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side - Text Section */}
          <div className="bg-white p-8 rounded-lg shadow-md" data-aos="fade-right">
            <h4 className="text-blue-500 font-semibold">About Our University</h4>
            <h1 className="text-4xl font-bold text-gray-800 my-4">
              Excellence in Education and Research
            </h1>
            <p className="text-gray-600 mb-4">
              Welcome to [University Name], a place where innovation meets tradition. Our university is committed to providing world-class education and fostering research that makes a global impact.
            </p>
            <p className="text-gray-600 mb-4">
              With a diverse range of programs and a vibrant campus life, we empower students to pursue their passions and make meaningful contributions to society.
            </p>
            <div className="mb-6">
              <p className="text-gray-700 mb-2" data-aos="fade-up">
                <i className="fa fa-check text-blue-500 mr-2"></i>Over 200 Undergraduate and Graduate Programs.
              </p>
              <p className="text-gray-700 mb-2" data-aos="fade-up" data-aos-delay="100">
                <i className="fa fa-check text-blue-500 mr-2"></i>Top-ranked research facilities.
              </p>
              <p className="text-gray-700 mb-2" data-aos="fade-up" data-aos-delay="200">
                <i className="fa fa-check text-blue-500 mr-2"></i>A global network of alumni and industry connections.
              </p>
              <p className="text-gray-700 mb-2" data-aos="fade-up" data-aos-delay="300">
                <i className="fa fa-check text-blue-500 mr-2"></i>State-of-the-art laboratories and technology resources.
              </p>
              <p className="text-gray-700 mb-2" data-aos="fade-up" data-aos-delay="400">
                <i className="fa fa-check text-blue-500 mr-2"></i>Comprehensive support services for students.
              </p>
              <p className="text-gray-700 mb-2" data-aos="fade-up" data-aos-delay="500">
                <i className="fa fa-check text-blue-500 mr-2"></i>Extensive library resources and online databases.
              </p>
              <p className="text-gray-700 mb-2"  data-aos="fade-up" data-aos-delay="600">
                <i className="fa fa-check text-blue-500 mr-2"></i>Strong emphasis on career development and internships.
              </p>
              <p className="text-gray-700"  data-aos="fade-up" data-aos-delay="700">
                <i className="fa fa-check text-blue-500 mr-2"></i>Collaborative research opportunities with leading experts.
              </p>
            </div>
            <a
              className="inline-block bg-blue-500 text-white font-semibold rounded-full px-6 py-3"
              href="#"
              data-aos="fade-up"
            >
              More Information
            </a>
          </div>

          {/* Right Side - Image and Stats Section */}
          <div className="bg-white p-8 rounded-lg shadow-md" data-aos="fade-left">
            <div className="mb-6 flex justify-center" data-aos="zoom-in">
              <img
                src="images/about-1.png" // Replace with a real campus image
                className="w-full h-auto rounded-lg"
                alt="University Campus"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg text-center" data-aos="fade-up">
                <span className="text-blue-500 text-2xl font-bold">30,000+</span>
                <h4 className="text-gray-800 font-semibold mt-2">Students Enrolled</h4>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center" data-aos="fade-up" data-aos-delay="100">
                <span className="text-blue-500 text-2xl font-bold">500+</span>
                <h4 className="text-gray-800 font-semibold mt-2">Faculty Members</h4>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center" data-aos="fade-up" data-aos-delay="200">
                <span className="text-blue-500 text-2xl font-bold">100+</span>
                <h4 className="text-gray-800 font-semibold mt-2">Research Projects</h4>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center" data-aos="fade-up" data-aos-delay="300">
                <span className="text-blue-500 text-2xl font-bold">200+</span>
                <h4 className="text-gray-800 font-semibold mt-2">Academic Programs</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
