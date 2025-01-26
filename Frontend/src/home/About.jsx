import React from "react";

const About = ({ id }) => {
  return (
    <section className="bg-gray-300 py-12 overflow-x-hidden" id={id}>
      <div className="container mx-auto px-6 py-10 ml-10 flex items-center justify-between">
        <div className="w-full lg:w-1/2 text-center lg:text-left ml-5 mr-5">
          <h2 className="text-5xl font-bold text-green-600 mb-7 ml-7">About Us</h2>
          <p className="text-gray-600 mb-6 text-xl ml-6">
            At AgroBooster, we are transforming the future of agriculture with the power of artificial intelligence. Our innovative software is designed to maximize crop yields, reduce wastage, and optimize farming operations for a sustainable, profitable future.

            We understand the challenges farmers face – from unpredictable weather patterns to resource management – and aim to simplify these complexities with cutting-edge AI technology. Our solution uses advanced data analytics to offer personalized recommendations, from soil health to irrigation management, ensuring your farm runs at its most efficient potential.

            Our mission is simple: To empower farmers with intelligent tools that improve productivity, reduce environmental impact, and unlock new levels of success. Whether you’re a small-scale grower or a large farm enterprise, AgroBooster provides the insights you need to make data-driven decisions that propel your farm forward.

            Join us in shaping a smarter, more sustainable agricultural future with the power of AI. Together, we can feed the world while protecting our planet.
          </p>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 mr-7">
          <img
            src="/Images/about-img.png"
            alt="AgroBooster Software"
            className="w-96 h-96 object-cover ml-52 rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
