import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./home/Dashboard";
import Rent from "./rental/rent";
import RentProduct from './rental/receiveRent'
import Description from "./rental/description";
import Login from "./crop/Login";
import Signup from "./crop/Signup";
import FarmerDashboard from "./dashboard/DashboardFarmer";
import BasicInfoForm from "./dashboard/BasicInfoForm";
import SoilTestForm from "./dashboard/SoilTestForm";
import SoilTestReportUploader from "./dashboard/test";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/receive" element={<RentProduct />} />
        <Route path="/description" element={<Description />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/test" element={<SoilTestReportUploader />}/>
        <Route path="/farmer-Information" element={<FarmerDashboard />}>
          <Route path="step1" element={<BasicInfoForm />} />
          <Route path="step2" element={<SoilTestForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
