import React, { useState } from "react";
import { useUser } from "../Context/UserContext";
import { Phone, Lock, LogIn, Sprout } from "lucide-react";
import loginImage from "../assets/login.jpg"; // Replace with the appropriate image path

const Login = () => {
  const { setUser } = useUser();
  const [formData, setFormData] = useState({ phoneNumber: "+91", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

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

      const userData = {
        fullname: data.user.fullname,
        id: data.user.id,
        phone_number: data.user.phone_number,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      window.location.href = "/testuser";
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-yellow-50 to-green-700">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl flex">
          {/* Left Panel - Login Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="flex items-center mb-5">
              <div className="inline-block p-4 bg-green-500 rounded-full mb-2">
                <Sprout size={15} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-green-800">AgroBooster</h1>
            </div>

            <div className="mb-5">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                  <input
                    type="password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors disabled:bg-green-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging In..." : "Login"}
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-green-600 hover:text-green-700 font-medium">
                    Sign Up here
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Right Panel - Decorative */}
          <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-start">
            <div className="absolute inset-0">
              <img
                src={loginImage}
                alt="Farmer in field"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-800/90 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
