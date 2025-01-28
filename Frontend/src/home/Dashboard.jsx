import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Service from './Service';
import Contact from './Contact';
import Footer from './Footer';

const Dashboard = () => {
  const [translatedText, setTranslatedText] = useState(""); // State to handle translation text
  
  return (
    <div>
      {/* Pass a callback function to Navbar */}
      <Navbar onTranslation={(translation) => setTranslatedText(translation)} />
      <Hero id="hero" />
      <About id="about" />
      <Service id="service" />
      <Contact id="contact" />
      <Footer />
    </div>
  );
};

export default Dashboard;
