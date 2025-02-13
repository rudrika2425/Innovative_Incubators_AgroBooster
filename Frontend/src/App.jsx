import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { LanguageProvider } from "./languageTranslation/LanguageContext";
import { UserProvider } from "./Context/UserContext";
import { ProtectedRoute } from "./Context/ProtectedRoutes";
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
import About from "./home/About";
import Service from "./home/Service";
import Contact from "./home/Contact";
import Navbar from "./home/Navbar";
import Hero from "./home/Hero";
import Footer from "./home/Footer";
import FarmDetails from "./Farmers/FarmDetails"
import Calendar from "./calendar/calendar"
import { Toaster } from "react-hot-toast";
import Farmerscheme from "./Farmers/FarmerScheme";
import Schemes from './Scheme/Schemes';
import News from './Scheme/News';

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
      <Toaster position="top" reverseOrder={false} />
        <Router>
          <Routes>
            {/* Public routes */}
            <Route element={<LayoutWithNavbar />}>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Service />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="farmerscheme" element={<Farmerscheme />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/news" element={<News />} />

            {/* Protected routes */}
            <Route path="/crop" element={
              <ProtectedRoute>
                <CropPrediction />
              </ProtectedRoute>
            } />
            <Route path="/guide" element={
              <ProtectedRoute>
                <OnboardingGuide />
              </ProtectedRoute>
            } />
            <Route path="/test" element={
              <ProtectedRoute>
                <SoilTestReportUploader />
              </ProtectedRoute>
            } />

            {/* Protected nested routes */}
            <Route path="/farmerdashboard" element={
              <ProtectedRoute>
                <FarmerDashboard />
              </ProtectedRoute>
            }>
              <Route index element={<Home />} />
              <Route path="your-farms" element={<YourFarms />} />
              <Route path="rent-out-tools" element={<RentOutTools />} />
              <Route path="borrow-tools" element={<BorrowTools />} />
              <Route path="weather-forecast" element={<WeatherForecast />} />
              <Route path="description" element={<DescriptionPage />} />
              <Route path="farm-details/:farmId" element={<FarmDetails />} />
              <Route path="farm-details/:farmId/calendar" element={<Calendar />} />
              
            </Route>

            <Route path="/farmer-Information" element={
              <ProtectedRoute>
                <InfoDashboard />
              </ProtectedRoute>
            }>
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