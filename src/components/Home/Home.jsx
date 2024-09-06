import React from 'react';
import Carousel from '../Carousel/Carousel';
import Feature from '../Feature/Feature';

import About from '../About/About';
import Teacher from '../Teacher/Teacher';
import Contact from "../Contact/Contact";
import Notices from '../Notices/Notices';


const Home = () => {
  return (
    <div>
       <Carousel></Carousel>
       <Feature></Feature>
       <About></About>
       <Teacher></Teacher>
       <Contact/>
       <Notices></Notices>

    
    </div>
  );
};

export default Home;
