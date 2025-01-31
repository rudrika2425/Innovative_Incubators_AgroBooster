import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [expectedOtp, setExpectedOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/twilio/send_sms", {
        phone_number: phoneNumber,
      });
      if (response.data.message === "OTP sent successfully") {
        alert("OTP sent successfully");
        setExpectedOtp(response.data.otp);
        setIsOtpSent(true);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === expectedOtp) {
      alert("OTP verified successfully");
      setIsOtpVerified(true);
    } else {
      alert("Invalid OTP");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!isOtpVerified) {
      alert("Please verify OTP before signing up");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/user/signup", {
        fullname,
        phone_number: phoneNumber,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      alert("Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-green-100">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-6xl font-bold mb-10">Sign Up</h2>
        <form className="w-3/4" onSubmit={handleSignup}>
          <input type="text" placeholder="Your Name" value={fullname} onChange={(e) => setFullname(e.target.value)} className="w-full p-2 mb-4 bg-white rounded-lg" />
          <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-2 mb-4 bg-white rounded-lg" />
          <button type="button" onClick={handleSendOtp} className="w-full bg-green-500 text-white py-2 rounded-xl mb-4" disabled={isOtpSent}>{isOtpSent ? "OTP Sent" : "Send OTP"}</button>
          {isOtpSent && !isOtpVerified && (
            <>
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-2 mb-4 bg-white rounded-lg" />
              <button type="button" onClick={handleVerifyOtp} className="w-full bg-green-500 text-white py-2 rounded-xl">Verify OTP</button>
            </>
          )}
          {isOtpVerified && (
            <>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 bg-white rounded-lg" />
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 mb-4 bg-white rounded-lg" />
              <button className="w-full bg-green-500 text-white py-2 rounded-xl" disabled={isSubmitting}>{isSubmitting ? "Signing Up..." : "Sign Up"}</button>
            </>
          )}
          <p className="text-sm mt-4">Already have an account? <a href="/login" className="text-green-500">Login</a></p>
        </form>
      </div>
      <div className="w-96 h-96 mt-40 bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/Images/farmer.webp')" }}></div>
    </div>
  );
};

export default Signup;