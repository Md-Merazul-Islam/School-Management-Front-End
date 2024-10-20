import React, { useEffect } from "react";
import animation from "./animation1.json";
import Lottie from "react-lottie";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Carousel.css";

const Carousel = () => {
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration (in ms)
      easing: "ease-in-out", // Animation easing function
      once: true, // Whether animation should happen only once
    });
  }, []);

  const AnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      {/* Landing Page Header Section */}
      <div className="header-carousel-item bg-primary h-[750px] relative">
        <div className="carousel-caption absolute inset-0 flex items-center bg-[#004CA0] bg-opacity-90">
          <div className="container mx-auto sm:mt-10">
            <div className="flex flex-wrap items-center ">
              {/* Text Content Section */}
              <div
                data-aos="fade-right"
                className="w-full lg:w-7/12 text-center md:text-left "
              >
                <h4 className="text-white uppercase font-bold mb-4">
                  Welcome to Our CST
                </h4>
                <h1 className="text-white text-6xl md:text-7xl lg:text-8xl mb-4">
                  Empowering Future Leaders
                </h1>
                <p className="mb-5 text-lg text-white max-w-[819px]">
                  At CST, we are dedicated to fostering academic excellence and
                  innovation. Join a diverse community of scholars and
                  experience world-class education.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a
                    className="bg-white text-blue-500 rounded-full py-3 px-6 flex items-center"
                    href="#apply"
                  >
                    <i className="fas fa-play-circle mr-2"></i> Watch Video
                  </a>
                  <a
                    className="bg-black text-white rounded-full py-3 px-6"
                    href="#learn-more"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              {/* Image Section */}
              {/* Image Section */}
              <div
                data-aos="fade-left"
                className="w-full lg:w-5/12 mt-8 lg:mt-0"
              >
                <div
                  className="carousel-img custom-padding flex justify-center items-center md:w-80 lg:w-[676px]"
                  data-aos-delay="400"
                >
                  <Lottie
                    options={AnimationOptions}
                    className="h-auto w-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
