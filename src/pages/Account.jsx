import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEcoMode } from "../components/EcoModeContext";
import { FaUser, FaEnvelope, FaSignOutAlt, FaArrowLeft, FaLeaf, FaTree, FaCoins, FaDollarSign, FaTrophy } from "react-icons/fa";

export default function Account() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { ecoMode } = useEcoMode();
  const [ecoPointsData, setEcoPointsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleLeaderboard = () => {
    navigate('/leaderboard');
  };

  // Fetch eco points data
  useEffect(() => {
    const fetchEcoPoints = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/eco-points/${user.id}`);
        const data = await response.json();
        
        if (response.ok) {
          setEcoPointsData(data.ecoPoints);
        } else {
          console.error('Error fetching eco points:', data.message);
        }
      } catch (error) {
        console.error('Error fetching eco points:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEcoPoints();
    }
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
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
          Account Profile
        </h1>
        
        <div className="space-y-6">
          {/* User Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaUser className={`h-5 w-5 ${
                ecoMode ? "text-green-500" : "text-blue-500"
              }`} />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FaEnvelope className={`h-5 w-5 ${
                ecoMode ? "text-green-500" : "text-blue-500"
              }`} />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Eco Points Section */}
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className={`text-xl font-bold ${ecoMode ? "text-green-700" : "text-blue-700"}`}>
                🌱 Your Eco Impact
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCoins className="text-green-600" />
                    <span className="font-semibold text-green-800">Eco Points</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">
                    {(ecoPointsData?.points || 0).toFixed(2)}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTree className="text-blue-600" />
                    <span className="font-semibold text-blue-800">Trees Planted</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">
                    {(ecoPointsData?.treesPlanted || 0).toFixed(2)}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaLeaf className="text-purple-600" />
                    <span className="font-semibold text-purple-800">CO₂ Offset (kg)</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-700">
                    {(ecoPointsData?.totalCO2Offset || 0).toFixed(2)}
                  </p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaDollarSign className="text-orange-600" />
                    <span className="font-semibold text-orange-800">Total Spent</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-700">
                    ${ecoPointsData?.totalSpent ? ecoPointsData.totalSpent.toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>

              {/* Recent Orders */}
              {ecoPointsData?.orders && ecoPointsData.orders.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-gray-700">Recent Orders</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {ecoPointsData.orders.slice(-3).reverse().map((order, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{order.orderId}</span>
                          <span className="text-sm text-green-600">+{order.ecoPoints} pts</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>${order.amount}</span>
                          <span>{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleLeaderboard}
              className={`w-full py-3 px-4 border-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                ecoMode 
                  ? "border-green-500 text-green-600 hover:bg-green-50" 
                  : "border-blue-500 text-blue-600 hover:bg-blue-50"
              }`}
            >
              <FaTrophy className="w-4 h-4" />
              View Leaderboard
            </button>
            
            <button
              onClick={handleBack}
              className={`w-full py-3 px-4 border-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                ecoMode 
                  ? "border-green-500 text-green-600 hover:bg-green-50" 
                  : "border-blue-500 text-blue-600 hover:bg-blue-50"
              }`}
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            
            <button
              onClick={handleLogout}
              className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                ecoMode 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              <FaSignOutAlt className="w-4 h-4" />
              Logout
            </button>
          </div>
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