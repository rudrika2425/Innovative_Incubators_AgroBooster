import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./home/Dashboard";
import Rent from "./rental/rent";
import RentProduct from './rental/receiveRent'
import Description from "./rental/description";
<<<<<<< Updated upstream
import Login from "./crop/Login";
import Signup from "./crop/Signup";
=======
import DashboardFarmer from "./dashboard/DashboardFarmer";
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/receive" element={<RentProduct />} />
        <Route path="/description" element={<Description />} />
<<<<<<< Updated upstream
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
=======
        <Route path="/dashboard-farmer" element={<DashboardFarmer />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
