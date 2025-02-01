import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ phoneNumber: "+91", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "phoneNumber") {
      setFormData({ ...formData, phoneNumber: "+91" + e.target.value.replace(/^\+91/, "") });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phoneNumber || !formData.password) {
      setError("All fields are required");
      return;
    }
    setError("");
    
    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: formData.phoneNumber,
          password: formData.password,
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
      
      console.log("Login successful", data);
      // Handle successful login (e.g., save token, redirect, etc.)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen bg-green-100">
      {/* Image Section */}
      <div
        className="w-1/2 h-full bg-cover bg-center flex justify-center items-center ml-10"
        style={{ backgroundImage: "url('/Images/farmer-login.png')" }}
      ></div>
      
      {/* Login Form Section */}
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <h2 className="text-5xl font-bold mb-8">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number *"
              className="w-full p-3 bg-white rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password *"
              className="w-full p-3 bg-white rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-bold mt-4 hover:bg-green-600"
          >
            Login
          </button>
          <p className="text-sm mt-4">
            Don't have an account? <a href="/signup" className="text-green-500">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
