import React from 'react';
import Carousel from '../Carousel/Carousel';
import Feature from '../Feature/Feature';

import About from '../About/About';
import Teacher from '../Teacher/Teacher';
import Contact from "../Contact/Contact";
import TestimonialCarousel from '../TestimonialCarousel/TestimonialCarousel';


const Home = () => {
  return (
    <div>
       <Carousel></Carousel>
       <Feature></Feature>
       <About></About>
       <Teacher></Teacher>
       <TestimonialCarousel/>
       <Contact/>

    
    </div>
  );
};

export default Home;
