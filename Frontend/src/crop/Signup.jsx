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
    <div className="flex h-screen bg-green-100">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-6xl font-bold mb-10">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="w-3/4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Your Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full p-2 mb-4 bg-white rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => {
              let input = e.target.value;

              // Ensure it always starts with +91
              if (!input.startsWith("+91")) {
                input = "+91" + input.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              }

              setPhoneNumber(input);
            }}
            className="w-full p-2 mb-4 bg-white rounded-lg"
            required
          />
          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full bg-green-500 text-white py-2 rounded-xl mb-4 hover:bg-green-600 disabled:bg-green-300"
            disabled={isOtpSent}
          >
            {isOtpSent ? "OTP Sent" : "Send OTP"}
          </button>

          {isOtpSent && !isOtpVerified && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 mb-4 bg-white rounded-lg"
                required
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
              >
                Verify OTP
              </button>
            </>
          )}

          {isOtpVerified && (
            <>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 bg-white rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mb-4 bg-white rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 disabled:bg-green-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </>
          )}

          <p className="text-sm mt-4">
            Already have an account?
            <a href="/login" className="text-green-500 hover:text-green-600 ml-1">
              Login
            </a>
          </p>
        </form>
      </div>
      <div
        className="w-96 h-96 mt-40 bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: "url('/Images/farmer.webp')" }}
        role="img"
        aria-label="Farmer illustration"
      />
    </div>
  );
};

export default Signup;