import React from 'react';
import Navbar from '../Scheme/Navbar';
import Schemes from '../Scheme/Schemes';
import News from '../Scheme/News';

const SchemeHome = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Schemes />
        <News />
      </div>
    </div>
  );
};

export default SchemeHome;