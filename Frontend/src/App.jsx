import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./home/Dashboard";
import Rent from "./rental/rent";
import RentProduct from "./rental/receiveRent";
import Description from "./rental/description";
import Login from "./crop/Login";
import Signup from "./crop/Signup";
import Chatbot from "./ChatBoat/Chatboat";

function App() {
 

  return (
    <Router>
      <div>
   
      

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/receive" element={<RentProduct />} />
          <Route path="/description" element={<Description />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
