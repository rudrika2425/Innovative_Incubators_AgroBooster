import React, { useState } from "react";
import { useUser } from "../Context/UserContext";
import { Phone, Lock, Sprout, Leaf, Sun, Cloud, Tractor } from "lucide-react";
import loginImage from "../assets/login.jpg";

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float opacity-40"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${8 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
          zIndex: 0
        }}
      >
        {i % 5 === 0 ? (
          <Leaf className="w-8 h-8 text-yellow-600" />
        ) : i % 5 === 1 ? (
          <Sprout className="w-9 h-9 text-lime-600" />
        ) : i % 5 === 2 ? (
          <Sun className="w-10 h-10 text-yellow-600" />
        ) : i % 5 === 3 ? (
          <Tractor className="w-11 h-11 text-green-600" />
        ) : (
          <Cloud className="w-10 h-10 text-gray-600" />
        )}
      </div>
    ))}
  </div>
);

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
  
      console.log("Login response data:", data); // Debugging log
  
      const userData = {
        fullname: data.user.fullname,
        id: data.user.id,
        phone_number: data.user.phone_number,
        isFirstLogin: data.user.isFirstLogin ?? true, // Ensure default value
      };
  
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
  
      // Check isFirstLogin properly
      if (userData.isFirstLogin === true) {
        window.location.href = "/guide";
      } else {
        window.location.href = "/farmerdashboard";
      }
    } catch (err) {
      setError(err.message);
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

      <FloatingElements />

      <div className="container mx-auto px-4 h-screen flex items-center justify-center relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl flex">
          {/* Left Panel - Login Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-block p-4 bg-yellow-600 rounded-full mb-2">
                <Sprout size={15} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-yellow-900">AgroBooster</h1>
            </div>

            <div className="mb-5">
              <h2 className="text-3xl font-bold text-yellow-900 mb-2">Welcome Back!</h2>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-yellow-900">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-yellow-600" />
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-yellow-900">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-yellow-600" />
                  <input
                    type="password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white py-3 rounded-xl font-medium transition-colors disabled:bg-yellow-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging In..." : "Login"}
              </button>

              <div className="text-center">
                <p className="text-yellow-900">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-yellow-600 hover:text-yellow-700 font-medium">
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
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;