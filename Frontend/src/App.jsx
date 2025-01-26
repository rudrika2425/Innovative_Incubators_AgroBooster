import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./home/Dashboard";
import Rent from "./rental/rent";
import RentProduct from './rental/receiveRent'
import Description from "./rental/description";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/receive" element={<RentProduct />} />
        <Route path="/description" element={<Description />} />
      </Routes>
    </Router>
  );
}

export default App;
