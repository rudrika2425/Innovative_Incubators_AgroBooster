import React, { useState } from "react";
import axios from "axios";
import { Leaf, Phone, Lock, User, CheckCircle } from 'lucide-react';  // Use Leaf instead of Tree
import signupImage from '../assets/signup.jpg';

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [expectedOtp, setExpectedOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/twilio/send_sms", {
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
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/user/signup", {
        fullname,
        phone_number: phoneNumber,
        password,
        otp,
        expected_otp: expectedOtp
      });

      if (response.data.message) {
        console.log(response.data);
        alert("Signup successful!");
        window.location.href = '/login';
      }
    } catch (error) {
      setError(error.response?.data?.error || "Signup failed");
      alert(error.response?.data?.error || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-yellow-50 to-green-500">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl flex">
          {/* Left Panel - Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="flex items-center mb-8">
              <Leaf className="h-8 w-8 text-green-600 mr-3" />  {/* Using Leaf icon */}
              <h1 className="text-2xl font-bold text-green-800">AgroBooster</h1>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Our Community</h2>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => {
                      let input = e.target.value;
                      if (!input.startsWith("+91")) {
                        input = "+91" + input.replace(/[^0-9]/g, "");
                      }
                      setPhoneNumber(input);
                    }}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                 
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 disabled:bg-green-300"
                disabled={isOtpSent}
              >
                {isOtpSent ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>OTP Sent</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP</span>
                  </>
                )}
              </button>

              {isOtpSent && !isOtpVerified && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors"
                  >
                    Verify OTP
                  </button>
                </div>
              )}

              {isOtpVerified && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                      <input
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                      <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors disabled:bg-green-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              )}

              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="text-green-600 hover:text-green-700 font-medium">
                    Login here
                  </a>
                </p>
              </div>
            </form>
          </div>

        
          {/* Right Panel - Decorative */}
<div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-start">
 

  {/* Background Image with Gradient */}
  <div className="absolute inset-0">
    <img 
      src={signupImage} 
      alt="Farm Field" 
      className="object-cover w-full h-full " 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-green-800/90 to-transparent" />
  </div>
</div>

          
        </div>
      </div>
    </div>
  );
};

export default Signup;
