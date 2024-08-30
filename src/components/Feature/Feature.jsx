import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import'./Feature.css'

const Feature = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto py-20">
        <div
          className="text-center mx-auto pb-12"
          style={{ maxWidth: '800px' }}
          data-aos="fade-up"
        >
          <h4 className="text-blue-500">Our Features</h4>
          <h1 className="text-5xl mb-4">Empowering Your Educational Journey</h1>
          <p className="mb-0">
            Our institution is committed to providing a supportive and challenging environment that encourages students to achieve their full potential. Discover the features that make our school, college, or university a leader in education.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div className="icon-container">
              <i className="fas fa-chalkboard-teacher text-3xl text-blue-500 transition duration-500"></i>
            </div>
            <h4 className="mt-6 mb-4 text-xl font-semibold transition duration-500">Experienced Faculty</h4>
            <p className="mb-4 transition duration-500">
              Our faculty members are industry experts with years of experience and a passion for teaching.
            </p>
            <a href="#" className="learn-more-btn text-white">Learn More</a>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
            <div className="icon-container">
              <i className="fas fa-book-open text-3xl text-blue-500 transition duration-500"></i>
            </div>
            <h4 className="mt-6 mb-4 text-xl font-semibold transition duration-500">Comprehensive Curriculum</h4>
            <p className="mb-4 transition duration-500">
              Our curriculum is designed to provide students with a broad understanding of their chosen field.
            </p>
            <a href="#" className="learn-more-btn text-white">Learn More</a>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
            <div className="icon-container">
              <i className="fas fa-laptop-code text-3xl text-blue-500 transition duration-500"></i>
            </div>
            <h4 className="mt-6 mb-4 text-xl font-semibold transition duration-500">State-of-the-Art Facilities</h4>
            <p className="mb-4 transition duration-500">
              Our campus is equipped with modern facilities, including labs, libraries, and sports centers.
            </p>
            <a href="#" className="learn-more-btn text-white">Learn More</a>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="800">
            <div className="icon-container">
              <i className="fas fa-user-graduate text-3xl text-blue-500 transition duration-500"></i>
            </div>
            <h4 className="mt-6 mb-4 text-xl font-semibold transition duration-500">Successful Alumni</h4>
            <p className="mb-4 transition duration-500">
              Our graduates have gone on to excel in various fields, from academia to industry, making us proud to be part of their journey.
            </p>
            <a href="#" className="learn-more-btn text-white">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
