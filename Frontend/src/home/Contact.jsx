import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Contact = ({ id }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/submit",
        formData
      );
      setStatusMessage("Your message has been sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatusMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div id={id} className="pt-20 bg-gray-200">
      <h3 className="text-5xl font-bold justify-center text-center -mb-12 text-green-600">
        Contact Us
      </h3>
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-5xl relative z-10">
          <motion.div
            ref={ref}
            className="md:w-1/2 p-6 flex flex-col justify-between relative bg-cover bg-center shadow-lg bg-black opacity-90"
            style={{ backgroundImage: "url(/Images/contact-img.png)" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="bg-black opacity-70 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">Location</h2>
              <p className="text-gray-200">
                123 Main Street, City, Country Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Cupiditate, quo!
              </p>
            </div>
            <div className="mt-6 bg-black opacity-70 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">Phone</h2>
              <p className="text-gray-200">+123 456 7890</p>
              <p className="text-gray-200">+123 456 7890</p>
              <p className="text-gray-200">+123 456 7890</p>
            </div>
            <div className="mt-6 bg-black opacity-70 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">Hours</h2>
              <p className="text-gray-200">Mon - Fri: 9 AM - 5 PM</p>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            className="p-6 bg-white md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Form
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 font-medium"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium"
                >
                  Comment or message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  rows="4"
                  className="w-full px-4 py-2 mt-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                Submit
              </button>
            </form>

            {statusMessage && (
              <div className="mt-4 text-center text-gray-800">
                <p>{statusMessage}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
