import React from "react";

const Signup = () => {
  return (
    <div className="flex h-screen bg-green-100  ">
      <div className="w-1/2 flex flex-col justify-center items-center  ml-50">
        <h2 className="text-6xl font-bold mb-10">Sign Up</h2>
        <form className="w-3/4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name "
              className="w-full p-2 bg-white rounded-lg focus:ring-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone Number "
              className="w-full p-2 bg-white rounded-lg focus:ring-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password "
              className="w-full p-2 bg-white rounded-lg focus:ring-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password "
              className="w-full p-2 bg-white rounded-lg focus:ring-2"
            />
          </div>

          
          <button className="w-full bg-green-500 text-white py-2 rounded-xl font-bold hover:bg-green-600">
            Sign Up
          </button>

          <p className="text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-green-500">
              Login
            </a>
          </p>
        </form>
      </div>

      {/* Right Section with Farmer Image */}
      <div className="w-96 h-96 mt-40 bg-cover bg-center flex justify-center items-center mr-50" style={{ backgroundImage: "url('/Images/farmer.webp')" }}>
        {/* Optional content or just a blank section to hold the image */}
      </div>
    </div>
  );
};

export default Signup;
