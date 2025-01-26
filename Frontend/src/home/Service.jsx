import React from "react";
import { motion } from "framer-motion";

const Service = ({ id }) => {
  const purposes = [
    {
      title: "Data-Driven Insights",
      description: 
        "Provide real-time, location-based analysis of weather, soil, and terrain to help farmers make tailored farming decisions. Use predictive analytics to anticipate weather patterns, pest invasions, and disease outbreaks, ensuring proactive management of farm resources.",
    },
    {
      title: "Precision Tools",
      description: 
        "Offer personalized crop calendars and task schedules for tasks such as irrigation, fertilization, and pest control. Provide early disease detection tools and suggest organic pest management practices to enhance farm productivity.",
    },
    {
      title: "Soil Testing Integration",
      description: 
        "Integrate soil testing services with the platform, enabling farmers to receive crop recommendations based on soil quality. Help farmers make data-backed decisions to optimize soil health and maximize crop yields.",
    },
    {
      title: "Disease Detection Plant Bot",
      description: 
        "Introduce a plant disease detection bot that uses image recognition to identify diseases in plants. As farmers upload images of their crops, the bot analyzes the images to provide timely alerts and recommendations for treatment.",
    },
    {
      title: "Weather and Pest Prediction",
      description: 
        "Utilize AI-driven predictive models to forecast weather changes and predict pest invasions, enabling farmers to take preventive actions before issues arise, minimizing crop damage and improving harvest outcomes.",
    },
    {
      title: "Actionable Reports and Alerts",
      description: 
        "Generate actionable reports and alerts based on real-time data. Provide insights that farmers can immediately act on, such as irrigation recommendations, disease warnings, or soil nutrient adjustments, helping farmers stay ahead of challenges.",
    },
  ];
  

  return (
    <div id={id} className="relative">
      <img
        src="/Images/hero-img.png"
        alt="background image"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>

      <motion.h3 className="text-5xl font-bold text-center mb-5 pt-20 text-white opacity-75">
        Our Services
      </motion.h3>

      <div className="flex flex-wrap justify-center gap-14  p-9">
        {purposes.map((purpose, index) => (
          <motion.div
            key={index}
            className="purpose-section max-w-xs w-1/3 rounded overflow-hidden shadow-lg  bg-white opacity-75 transition-all duration-500 transform hover:scale-105 cursor-pointer"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 5 }}
            transition={{
              duration: 0.8,
              delay: 0.2 + index * 0.2,
              type: "spring",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 25px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
          >
            <div
              className={`bg-green-600 h-16 relative flex justify-center items-center `}
            >
              <h3 className="text-xl font-semibold text-white">
                {purpose.title}
              </h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600">{purpose.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Service;
