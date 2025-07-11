import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useEcoMode } from "../components/EcoModeContext";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/config";

export default function Login() {
  const navigate = useNavigate();
  const { ecoMode } = useEcoMode();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.message === 'Login successful') {
        login(data.user, data.token);
        toast.success('Logged in successfully!');
        navigate('/');
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Login error. Please try again.");
    }
    setLoading(false);
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
          Sign In
        </h1>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className={`h-5 w-5 ${
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
          
          {error && (
            <div className="text-red-500 text-center bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className={`w-full py-3 mt-4 text-white font-bold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 ${
              ecoMode 
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Signing in...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className={`font-semibold hover:underline ${
                ecoMode ? "text-green-600" : "text-blue-600"
              }`}
            >
              Sign up
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