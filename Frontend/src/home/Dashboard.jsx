import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Service from './Service'
import Contact from './Contact'
import Footer from './Footer'

const Dashboard = () => {
  return (
    <div>
     <Navbar />
     <Hero id="hero" />
     <About id="about" />
     <Service id="service" />
     <Contact id="contact" />
     <Footer/>
    </div>
  )
}

export default Dashboard
