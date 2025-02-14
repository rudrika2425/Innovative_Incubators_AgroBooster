import React, { useState } from "react";
import { useUser } from "../Context/UserContext";
import { Phone, Lock, Sprout } from "lucide-react";
import loginImage from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import { TranslatedText } from '../languageTranslation/TranslatedText';
import toast, { Toaster } from 'react-hot-toast';



const Login = () => {
  const { setUser } = useUser();
  const [formData, setFormData] = useState({ phoneNumber: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phoneNumber || !formData.password) {
      toast.error("All fields are required", {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#FEF2F2',
          color: '#991B1B',
          padding: '16px',
          borderRadius: '8px',
          fontSize: '16px',
        },
      });
      return;
    }

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
        isFirstLogin: data.user.isFirstLogin ?? true,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Show success toast and delay navigation
      const successPromise = toast.success("Login successful! Redirecting...", {
        duration: 2000,
        position: 'top-center',
        style: {
          background: '#F0FDF4',
          color: '#166534',
          padding: '16px',
          borderRadius: '8px',
          fontSize: '16px',
        },
      });

      // Wait for toast to complete before navigating
      await successPromise;
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (userData.isFirstLogin === true) {
        window.location.href = "/guide";
      } else {
        window.location.href = "/farmerdashboard";
      }

    } catch (err) {
      toast.error(err.message, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#FEF2F2',
          color: '#991B1B',
          padding: '16px',
          borderRadius: '8px',
          fontSize: '16px',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 relative">
      {/* Add Toaster component at the root */}
      <Toaster 
        toastOptions={{
          className: 'shadow-lg',
        }}
      />

      <div className="container mx-auto px-4 h-screen flex items-center justify-center relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl flex">
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-block p-4 bg-yellow-600 rounded-full mb-2">
                <Sprout size={15} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-yellow-900">
                <TranslatedText text="AgroBooster" />
              </h1>
            </div>

            <div className="mb-5">
              <h2 className="text-3xl font-bold text-yellow-900 mb-2">
                <TranslatedText text="Welcome Back!" />
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-yellow-900">
                  <TranslatedText text="Phone Number" />
                </label>
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
                <label className="text-sm font-medium text-yellow-900">
                  <TranslatedText text="Password" />
                </label>
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
                <TranslatedText text={isSubmitting ? "Logging In..." : "Login"} />
              </button>

              <div className="text-center">
                <p className="text-yellow-900">
                  <TranslatedText text="Don't have an account?" />{" "}
                  <a href="/signup" className="text-yellow-600 hover:text-yellow-700 font-medium">
                    <TranslatedText text="Sign Up here" />
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-start">
            <div className="absolute inset-0">
              <img src={loginImage} alt="Farmer in field" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;