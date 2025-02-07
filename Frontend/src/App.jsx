import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./Context/LanguageContext";  
import { UserProvider } from "./Context/UserContext";
import Dashboard from "./home/Dashboard";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import SoilTestReportUploader from "./information/SoilAnalysis";
import Chatbot from "./ChatBoat/Chatboat";
import FarmerInput from "./information/FarmerInput";
import SoilTest from "./information/SoilTest";
import OnboardingGuide from "./authentication/onboardingGuide";
import FarmerDashboard from "./Farmers/FarmerDashbord";
import InfoDashboard from "./information/InfoDashboard";
import RentOutTools from "./Farmers/RentOutTools";
import BorrowTools from "./Farmers/BorrowTools";
import YourFarms from "./Farmers/YourFarms";
import Home from "./Farmers/Home";
import CropPrediction from "./information/CropPrediction";
import WeatherForecast from "./Farmers/WeatherForcast";
import DescriptionPage from "./Farmers/description"




function App() {
  return (

    <LanguageProvider>  
       <UserProvider>   
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/crop" element={<CropPrediction />} />
          <Route path="/guide" element={<OnboardingGuide />} />
          <Route path="/test" element={<SoilTestReportUploader />} />
          <Route path="/farmerdashboard" element={<FarmerDashboard />}>
            <Route index element={<Home />} />
            <Route path="your-farms" element={<YourFarms />} />
            <Route path="rent-out-tools" element={<RentOutTools />} />
            <Route path="borrow-tools" element={<BorrowTools />} />
            <Route path="weather-forecast" element={<WeatherForecast />} />
            <Route path="description" element={<DescriptionPage />} />
          </Route>

          <Route path="/farmer-Information" element={<InfoDashboard />}>
            <Route path="basicInformation" element={<FarmerInput />} />
            <Route path="soilTesting" element={<SoilTest />} />
          </Route>
        </Routes>
      </Router>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
