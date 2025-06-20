import { FaShoppingCart, FaUser, FaHeart, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEcoMode } from "./EcoModeContext";

const WALMART_LOGO = "/walmart.png";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pickup, setPickup] = useState(true);
  const { ecoMode } = useEcoMode();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const handlePickupToggle = () => setPickup((prev) => !prev);

  return (
    <nav className={`w-full flex items-center px-4 py-2 gap-4 transition-colors duration-700 ${ecoMode ? "bg-green-400" : "bg-blue-600"}`}>
      {/* Logo */}
      <Link to="/">
        <img src={WALMART_LOGO} alt="Walmart Logo" className="h-10 w-10 mr-4 cursor-pointer" />
      </Link>
      {/* Pickup/Delivery Pill */}
      <button
        type="button"
        onClick={handlePickupToggle}
        className={`flex items-center rounded-full px-6 py-2 mr-4 focus:outline-none transition-colors duration-700 ${ecoMode ? "bg-green-800" : "bg-blue-800"}`}
      >
        <span className="bg-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
          <img src={pickup ? "https://cdn-icons-png.flaticon.com/512/1170/1170678.png" : "https://cdn-icons-png.flaticon.com/512/1046/1046857.png"} alt={pickup ? "Pickup" : "Delivery"} className="h-6 w-6" />
        </span>
        <span className="text-white font-bold text-lg">{pickup ? "Pickup" : "Delivery"}</span>
      </button>
      {/* Search Bar */}
      <form className="flex-1 flex items-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Walmart"
          className="w-full rounded-full px-6 py-2 text-blue-700 text-lg focus:outline-none"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className={`-ml-10 rounded-full h-8 w-8 flex items-center justify-center transition-colors duration-700 ${ecoMode ? "bg-green-800" : "bg-blue-800"}`}
        >
          <FaSearch className="text-white" />
        </button>
      </form>
      {/* Right Side Icons/Links */}
      <div className="flex items-center gap-6 ml-6">
        <div className="flex items-center gap-2 text-white cursor-pointer">
          <FaHeart />
          <span className="font-bold">Reorder <span className="font-normal">My Items</span></span>
        </div>
        <div className="flex items-center gap-2 text-white cursor-pointer">
          <FaUser />
          <span className="font-bold">Sign In <span className="font-normal">Account</span></span>
        </div>
        <Link to="/cart" className="flex items-center gap-2 text-white cursor-pointer">
          <FaShoppingCart className="text-2xl" />
          <span className="font-bold">${total}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
