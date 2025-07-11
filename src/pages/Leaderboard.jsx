import React, { useState, useEffect } from "react";
import { useEcoMode } from "../components/EcoModeContext";
import { FaTrophy, FaLeaf, FaTree, FaCoins, FaMedal, FaCrown } from "react-icons/fa";
import { BACKEND_URL } from "../utils/config";

export default function Leaderboard() {
  const { ecoMode } = useEcoMode();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/leaderboard`);
      const data = await response.json();
      
      if (response.ok) {
        setLeaderboard(data.leaderboard);
      } else {
        setError(data.message || 'Failed to fetch leaderboard');
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError('Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <FaCrown className="text-yellow-500 text-xl" />;
    if (rank === 2) return <FaMedal className="text-gray-400 text-xl" />;
    if (rank === 3) return <FaMedal className="text-amber-600 text-xl" />;
    return <span className="text-gray-600 font-bold">{rank}</span>;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-500";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-400";
    if (rank === 3) return "bg-gradient-to-r from-amber-500 to-amber-600";
    return ecoMode ? "bg-green-50 hover:bg-green-100" : "bg-blue-50 hover:bg-blue-100";
  };

  if (loading) {
    return (
      <div className={`min-h-screen py-10 flex items-center justify-center transition-colors duration-700 ${
        ecoMode ? "bg-green-50" : "bg-blue-50"
      }`}>
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <span className="text-lg font-semibold">Loading Leaderboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen py-10 flex items-center justify-center transition-colors duration-700 ${
        ecoMode ? "bg-green-50" : "bg-blue-50"
      }`}>
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button 
            onClick={fetchLeaderboard}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              ecoMode 
                ? "bg-green-500 text-white hover:bg-green-600" 
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-6 sm:py-10 transition-colors duration-700 ${
      ecoMode ? "bg-green-50" : "bg-blue-50"
    }`}>
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <FaTrophy className={`text-3xl sm:text-4xl ${ecoMode ? "text-green-600" : "text-blue-600"}`} />
            <h1 className={`text-2xl sm:text-4xl font-extrabold ${ecoMode ? "text-green-700" : "text-blue-700"}`}>
              Eco Leaderboard
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-lg">
            Top environmental champions making a difference
          </p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
          {/* Header Row */}
          <div className={`grid grid-cols-8 sm:grid-cols-12 gap-2 sm:gap-4 p-2 sm:p-4 font-bold text-xs sm:text-sm ${
            ecoMode ? "bg-green-100" : "bg-blue-100"
          }`}>
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-2 text-center">Eco Points</div>
            <div className="col-span-2 text-center">Trees Planted</div>
            <div className="col-span-2 text-center hidden sm:block">CO₂ Offset (kg)</div>
            <div className="col-span-2 text-center hidden sm:block">Total Spent</div>
          </div>

          {/* Leaderboard Rows */}
          <div className="divide-y divide-gray-200">
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => (
                <div 
                  key={user.userId} 
                  className={`grid grid-cols-8 sm:grid-cols-12 gap-2 sm:gap-4 p-2 sm:p-4 items-center transition-all duration-300 text-xs sm:text-base ${getRankColor(user.rank)}`}
                >
                  {/* Rank */}
                  <div className="col-span-1 text-center">
                    <div className="flex items-center justify-center">
                      {getRankIcon(user.rank)}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="col-span-3">
                    <div className="font-semibold text-gray-900 truncate">{user.name}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 truncate">{user.email}</div>
                  </div>

                  {/* Eco Points */}
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <FaCoins className="text-green-600" />
                      <span className="font-bold text-green-700">{user.points.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Trees Planted */}
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <FaTree className="text-blue-600" />
                      <span className="font-bold text-blue-700">{user.treesPlanted.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* CO₂ Offset */}
                  <div className="col-span-2 text-center hidden sm:block">
                    <div className="flex items-center justify-center gap-1">
                      <FaLeaf className="text-purple-600" />
                      <span className="font-bold text-purple-700">{user.totalCO2Offset.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total Spent */}
                  <div className="col-span-2 text-center hidden sm:block">
                    <div className="font-bold text-gray-700">${user.totalSpent.toFixed(2)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 sm:p-8 text-center text-gray-500">
                <FaTrophy className="text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4 text-gray-300" />
                <p className="text-base sm:text-lg">No eco champions yet!</p>
                <p className="text-xs sm:text-sm">Start shopping to earn eco points and climb the leaderboard.</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Summary */}
        {leaderboard.length > 0 && (
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
              <FaCoins className="text-2xl sm:text-3xl text-green-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Total Eco Points</h3>
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                {leaderboard.reduce((sum, user) => sum + user.points, 0).toFixed(2)}
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
              <FaTree className="text-2xl sm:text-3xl text-blue-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Total Trees Planted</h3>
              <p className="text-lg sm:text-2xl font-bold text-blue-600">
                {leaderboard.reduce((sum, user) => sum + user.treesPlanted, 0).toFixed(2)}
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg text-center">
              <FaLeaf className="text-2xl sm:text-3xl text-purple-600 mx-auto mb-1 sm:mb-2" />
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Total CO₂ Offset</h3>
              <p className="text-lg sm:text-2xl font-bold text-purple-600">
                {leaderboard.reduce((sum, user) => sum + user.totalCO2Offset, 0).toFixed(2)} kg
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 