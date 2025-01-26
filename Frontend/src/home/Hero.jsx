import React from "react";

const Hero = ({ id }) => {
  return (
    <div
      id={id}
      className="relative h-screen bg-cover bg-center -mt-17"
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-90 object-cover"
        style={{
          backgroundImage: `url('/Images/hero-img.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center", 
        }}
      ></div>
<div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-6xl font-extrabold text-black mb-6 drop-shadow-lg -mt- mb-10">
          AGRICULTURAL COMMUNITY SERVICE
        </h1>
        <p className="text-4xl text-black  font-bold mb-14 drop-shadow-md mt-3">
          Bringing innovative solutions to farming communities.
        </p>
        <div className="flex flex-row gap-10 -ml-6">
          <a
            href="#learn-more"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg font-medium drop-shadow-md"
          >
            Plant Bot
          </a>
          <a
            href="#learn-more"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg font-medium drop-shadow-md"
          >
            Grow Crop
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
