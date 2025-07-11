import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useEcoMode } from "../components/EcoModeContext";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaPhone, FaUserPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/config";

export default function Signup() {
  const navigate = useNavigate();
  const { ecoMode } = useEcoMode();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    setOtpError("");
    try {
      // Send OTP to email
      const res = await fetch(`${BACKEND_URL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("OTP sent to your email");
        setOtpModal(true);
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
    setLoading(false);
  }

  async function handleOtpSubmit(e) {
    e.preventDefault();
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        // Auto-login after successful signup
        const loginRes = await fetch(`${BACKEND_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
          credentials: "include",
        });
        const loginData = await loginRes.json();
        if (loginData.message === "Login successful") {
          login(loginData.user, loginData.token);
          toast.success("Account created and logged in successfully!");
          navigate("/");
        } else {
          toast.success("Account created successfully! Please sign in.");
          navigate("/login");
        }
      } else {
        setOtpError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setOtpError("Failed to verify OTP. Please try again.");
    }
    setOtpLoading(false);
  }

  return (
    <div className={`min-h-screen py-10 flex items-center justify-center transition-colors duration-700 ${
      ecoMode ? "bg-green-50" : "bg-blue-50"
    }`}>
      <div className={`bg-white/95 rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up ${
        ecoMode ? "border-green-200" : "border-blue-200"
      } border`}>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/walmart.png" alt="Walmart Logo" className="h-12 w-12" />
        </div>
        
        <h1 className={`text-3xl font-extrabold text-center mb-8 drop-shadow-lg ${
          ecoMode ? "text-green-700" : "text-blue-700"
        }`}>
          Create Account
        </h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className={`h-5 w-5 ${
                ecoMode ? "text-green-500" : "text-blue-500"
              }`} />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-400 ${
                ecoMode 
                  ? "border-green-200 focus:ring-green-400 focus:border-green-400" 
                  : "border-blue-200 focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Full name"
              required
              disabled={loading}
            />
          </div>
          
          {/* Email Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className={`h-5 w-5 ${
                ecoMode ? "text-green-500" : "text-blue-500"
              }`} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-400 ${
                ecoMode 
                  ? "border-green-200 focus:ring-green-400 focus:border-green-400" 
                  : "border-blue-200 focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Email address"
              required
              disabled={loading}
            />
          </div>
          
          {/* Phone Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className={`h-5 w-5 ${
                ecoMode ? "text-green-500" : "text-blue-500"
              }`} />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-400 ${
                ecoMode 
                  ? "border-green-200 focus:ring-green-400 focus:border-green-400" 
                  : "border-blue-200 focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Phone number"
              required
              disabled={loading}
            />
          </div>
          
          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className={`h-5 w-5 ${
                ecoMode ? "text-green-500" : "text-blue-500"
              }`} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`pl-10 pr-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-400 ${
                ecoMode 
                  ? "border-green-200 focus:ring-green-400 focus:border-green-400" 
                  : "border-blue-200 focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <FaEyeSlash className={`h-5 w-5 ${
                  ecoMode ? "text-green-500" : "text-blue-500"
                }`} />
              ) : (
                <FaEye className={`h-5 w-5 ${
                  ecoMode ? "text-green-500" : "text-blue-500"
                }`} />
              )}
            </button>
          </div>
          
          {/* Confirm Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className={`h-5 w-5 ${
                ecoMode ? "text-green-500" : "text-blue-500"
              }`} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`pl-10 pr-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 placeholder-gray-400 ${
                ecoMode 
                  ? "border-green-200 focus:ring-green-400 focus:border-green-400" 
                  : "border-blue-200 focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Confirm password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className={`h-5 w-5 ${
                  ecoMode ? "text-green-500" : "text-blue-500"
                }`} />
              ) : (
                <FaEye className={`h-5 w-5 ${
                  ecoMode ? "text-green-500" : "text-blue-500"
                }`} />
              )}
            </button>
          </div>
          
          {error && (
            <div className="text-red-500 text-center bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className={`w-full py-3 mt-6 text-white font-bold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 ${
              ecoMode 
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Signing up...
              </>
            ) : (
              <>
                <FaUserPlus className="w-5 h-5" />
                Create Account
              </>
            )}
          </button>
        </form>
        
        {/* OTP Modal */}
        {otpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs relative animate-fade-in-up">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setOtpModal(false)}
                disabled={otpLoading}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Verify Email</h2>
              <p className="text-gray-600 text-sm mb-2 text-center">Enter the OTP sent to <span className="font-semibold">{formData.email}</span></p>
              <form onSubmit={handleOtpSubmit} className="space-y-3">
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-center text-lg tracking-widest"
                  placeholder="Enter OTP"
                  maxLength={6}
                  required
                  disabled={otpLoading}
                  autoFocus
                />
                {otpError && <div className="text-red-500 text-center text-sm">{otpError}</div>}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-60"
                  disabled={otpLoading}
                >
                  {otpLoading ? "Verifying..." : "Verify & Create Account"}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className={`font-semibold hover:underline ${
                ecoMode ? "text-green-600" : "text-blue-600"
              }`}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </div>
  );
} 