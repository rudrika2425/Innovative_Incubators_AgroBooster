import React, { useState } from "react";
import axios from "axios";
import { Leaf, Phone, Lock, User, CheckCircle, Sprout, Sun, Cloud, Tractor } from 'lucide-react';
import signupImage from '../assets/signup.jpg';
import { TranslatedText } from '../languageTranslation/TranslatedText';
import { Toaster, toast }from "react-hot-toast"

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
  const [error, setError] = useState("");

  // Existing handlers remain the same
  const handleSendOtp = async () => {
    if (!phoneNumber) {
      toast.error("Please enter a phone number", {
        duration: 3000,
        position: 'top-center',
        icon: '📱',
      });
      return;
    }
    const loadingToast = toast.loading("Sending OTP...", {
      position: 'top-center'
    });
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}twilio/send_sms`, {
        phone_number: phoneNumber,
      });
      toast.dismiss(loadingToast);
      if (response.data.message === "OTP sent successfully") {
        toast.success("OTP sent successfully! Check your phone", {
          duration: 4000,
          position: 'top-center',
          icon: '✉️',
        });
        setExpectedOtp(response.data.otp);
        setIsOtpSent(true);
      } else {
        toast.error("Failed to send OTP. Please try again", {
          duration: 3000,
          position: 'top-center',
          icon: '❌',
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Network error. Please check your connection", {
        duration: 3000,
        position: 'top-center',
        icon: '🌐',
      });
    }
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      toast.error("Please enter the OTP", {
        duration: 3000,
        position: 'top-center',
        icon: '🔢',
      });
      return;
    }
    if (otp === expectedOtp) {
      toast.success("OTP verified successfully!", {
        duration: 3000,
        position: 'top-center',
        icon: '✅',
      });
      setIsOtpVerified(true);
    } else {
      toast.error("Invalid OTP. Please try again", {
        duration: 3000,
        position: 'top-center',
        icon: '❌',
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        duration: 3000,
        position: 'top-center',
        icon: '🔐',
      });
      return;
    }

    if (!isOtpVerified) {
      toast.error("Please verify OTP before signing up", {
        duration: 3000,
        position: 'top-center',
        icon: '📝',
      });
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Creating your account...", {
      position: 'top-center'
    });
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}user/signup`, {
        fullname,
        phone_number: phoneNumber,
        password,
        otp,
        expected_otp: expectedOtp
      });
      toast.dismiss(loadingToast);
      if (response.data.message) {
        toast.success("Welcome to AgroBooster! Redirecting...", {
          duration: 4000,
          position: 'top-center',
          icon: '🌱',
        });
        
        window.location.href = '/login';
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Signup failed. Please try again", {
        duration: 4000,
        position: 'top-center',
        icon: '❌',
      });
      setError(error.response?.data?.error || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 relative">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
      `}</style>
  
      <div className="container mx-auto px-4 h-screen flex items-center justify-center relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl flex">
          
          {/* Left Panel - Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="inline-block p-4 bg-yellow-600 rounded-full">
                <Sprout size={15} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-yellow-900">
                <TranslatedText text="AgroBooster" />
              </h1>
            </div>
  
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-yellow-900 mb-2">
                <TranslatedText text="Welcome to Our Community" />
              </h2>
            </div>
  
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}
  
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-yellow-900">
                  <TranslatedText text="Full Name" />
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-yellow-600" />
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
  
              <div className="space-y-2">
                <label className="text-sm font-medium text-yellow-900">
                  <TranslatedText text="Phone Number" />
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-yellow-600" />
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
  
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 disabled:bg-yellow-300"
                disabled={isOtpSent}
              >
                {isOtpSent ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>
                      <TranslatedText text="OTP Sent" />
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <TranslatedText text="Send OTP" />
                    </span>
                  </>
                )}
              </button>
  
              {isOtpSent && !isOtpVerified && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-600" />
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="w-full bg-yellow-600 hover:bg-yellow-500 text-white py-3 rounded-xl font-medium transition-colors"
                  >
                    <TranslatedText text="Verify OTP" />
                  </button>
                </div>
              )}
  
              {isOtpVerified && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-yellow-900">
                      <TranslatedText text="Password" />
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-600" />
                      <input
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-yellow-900">
                      <TranslatedText text="Confirm Password" />
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-600" />
                      <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
  
                  <button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-500 text-white py-3 rounded-xl font-medium transition-colors disabled:bg-yellow-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <TranslatedText text="Creating Account..." /> : <TranslatedText text="Create Account" />}
                  </button>
                </div>
              )}
  
              <div className="text-center">
                <p className="text-yellow-900">
                  <TranslatedText text="Already have an account?" />{' '}
                  <a href="/login" className="text-yellow-600 hover:text-yellow-700 font-medium">
                    <TranslatedText text="Login here" />
                  </a>
                </p>
              </div>
            </form>
          </div>
  
          {/* Right Panel - Decorative */}
          <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-start">
            <div className="absolute inset-0">
              <img 
                src={signupImage} 
                alt="Farm Field" 
                className="object-cover w-full h-full" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;