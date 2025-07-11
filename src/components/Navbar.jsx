import { FaShoppingCart, FaUser, FaHeart, FaSearch, FaSignOutAlt, FaBars, FaTimes, FaTrophy } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEcoMode } from "./EcoModeContext";
import { useAuth } from "../context/AuthContext";
import { selectCartTotal } from "../redux/Slices/CartSlice";
import toast from "react-hot-toast";

const WALMART_LOGO = "/walmart.png";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const total = useSelector(selectCartTotal).toFixed(2);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pickup, setPickup] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { ecoMode } = useEcoMode();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const handlePickupToggle = () => setPickup((prev) => !prev);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`w-full transition-colors duration-700 ${ecoMode ? "bg-green-400" : "bg-blue-600"}`}>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center px-4 py-2 gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={WALMART_LOGO} alt="Walmart Logo" className="h-10 w-10 cursor-pointer" />
        </Link>
        
        {/* Pickup/Delivery Pill */}
        <button
          type="button"
          onClick={handlePickupToggle}
          className={`flex items-center rounded-full px-4 lg:px-6 py-2 focus:outline-none transition-colors duration-700 flex-shrink-0 ${ecoMode ? "bg-green-800" : "bg-blue-800"}`}
        >
          <span className="bg-white rounded-full h-6 w-6 lg:h-8 lg:w-8 flex items-center justify-center mr-2">
            <img 
              src={pickup ? "https://cdn-icons-png.flaticon.com/512/1170/1170678.png" : "https://cdn-icons-png.flaticon.com/512/1046/1046857.png"} 
              alt={pickup ? "Pickup" : "Delivery"} 
              className="h-4 w-4 lg:h-6 lg:w-6" 
            />
          </span>
          <span className="text-white font-bold text-sm lg:text-lg hidden lg:block">{pickup ? "Pickup" : "Delivery"}</span>
        </button>
        
        {/* Search Bar */}
        <form className="flex-1 flex items-center max-w-md lg:max-w-lg" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Walmart"
            className="w-full rounded-full px-4 lg:px-6 py-2 text-blue-700 text-sm lg:text-lg focus:outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className={`-ml-10 rounded-full h-8 w-8 flex items-center justify-center transition-colors duration-700 ${ecoMode ? "bg-green-800" : "bg-blue-800"}`}
          >
            <FaSearch className="text-white text-sm" />
          </button>
        </form>
        
        {/* Right Side Icons/Links */}
                  <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-2 text-white cursor-pointer">
              <FaHeart />
              <span className="font-bold">Reorder <span className="font-normal">My Items</span></span>
            </div>
            
            <Link to="/leaderboard" className="hidden lg:flex items-center gap-2 text-white cursor-pointer hover:opacity-80 transition-opacity">
              <FaTrophy />
              <span className="font-bold">Leaderboard</span>
            </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/account" className="flex items-center gap-2 text-white cursor-pointer hover:opacity-80 transition-opacity">
                <FaUser />
                <span className="font-bold hidden lg:block">Account</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-white cursor-pointer hover:opacity-80 transition-opacity"
              >
                <FaSignOutAlt />
                <span className="font-bold hidden lg:block">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="flex items-center gap-2 text-white cursor-pointer hover:opacity-80 transition-opacity">
                <span className="font-bold hidden lg:block">Sign Up</span>
              </Link>
              <Link to="/login" className="flex items-center gap-2 text-white cursor-pointer hover:opacity-80 transition-opacity">
                <FaUser />
                <span className="font-bold hidden lg:block">Sign In</span>
              </Link>
            </>
          )}

          <Link to="/cart" className="flex items-center gap-2 text-white cursor-pointer hover:opacity-80 transition-opacity">
            <FaShoppingCart className="text-xl lg:text-2xl" />
            <span className="font-bold text-sm lg:text-base">${total}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex-shrink-0">
            <img src={WALMART_LOGO} alt="Walmart Logo" className="h-8 w-8 cursor-pointer" />
          </Link>
          
          <div className="flex items-center gap-3">
            <Link to="/cart" className="flex items-center gap-1 text-white">
              <FaShoppingCart className="text-lg" />
              <span className="font-bold text-sm">${total}</span>
            </Link>
            
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-2">
          <form className="flex items-center" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Walmart"
              className="flex-1 rounded-full px-4 py-2 text-blue-700 text-sm focus:outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className={`-ml-8 rounded-full h-8 w-8 flex items-center justify-center transition-colors duration-700 ${ecoMode ? "bg-green-800" : "bg-blue-800"}`}
            >
              <FaSearch className="text-white text-sm" />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="px-4 pb-4 space-y-3">
            {/* Pickup/Delivery Toggle */}
            <button
              type="button"
              onClick={handlePickupToggle}
              className={`w-full flex items-center justify-center rounded-lg px-4 py-3 focus:outline-none transition-colors duration-700 ${ecoMode ? "bg-green-800" : "bg-blue-800"}`}
            >
              <span className="bg-white rounded-full h-6 w-6 flex items-center justify-center mr-3">
                <img 
                  src={pickup ? "https://cdn-icons-png.flaticon.com/512/1170/1170678.png" : "https://cdn-icons-png.flaticon.com/512/1046/1046857.png"} 
                  alt={pickup ? "Pickup" : "Delivery"} 
                  className="h-4 w-4" 
                />
              </span>
              <span className="text-white font-bold">{pickup ? "Pickup" : "Delivery"}</span>
            </button>

            {/* Reorder */}
            <div className="flex items-center gap-3 text-white p-3 bg-white bg-opacity-10 rounded-lg">
              <FaHeart />
              <span className="font-bold">Reorder My Items</span>
            </div>

            {/* Leaderboard */}
            <Link 
              to="/leaderboard" 
              className="flex items-center gap-3 text-white p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTrophy />
              <span className="font-bold">Leaderboard</span>
            </Link>

            {/* Auth Links */}
            {isAuthenticated ? (
              <>
                <Link 
                  to="/account" 
                  className="flex items-center gap-3 text-white p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUser />
                  <span className="font-bold">Account</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 text-white p-3 bg-red-600 rounded-lg hover:bg-red-700 transition-all"
                >
                  <FaSignOutAlt />
                  <span className="font-bold">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/signup" 
                  className="flex items-center justify-center gap-3 text-white p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-bold">Sign Up</span>
                </Link>
                <Link 
                  to="/login" 
                  className="flex items-center justify-center gap-3 text-white p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUser />
                  <span className="font-bold">Sign In</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
