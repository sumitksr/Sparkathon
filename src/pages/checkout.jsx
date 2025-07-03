import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import co2Data from "../components/co2";
import CartItem from "../components/CartItem";
import { FaLeaf } from "react-icons/fa";

export default function Checkout() {
  const { cart } = useSelector((state) => state);
  const [donation, setDonation] = useState(0);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalCarbonFootprint = cart.reduce((sum, item) => {
    const productCO2 = co2Data.find((p) => p.id === item.id)?.carbonFootprint || 0;
    return sum + productCO2 * (item.quantity || 1);
  }, 0);

  const handleDonationChange = (e) => {
    const value = parseFloat(e.target.value);
    setDonation(isNaN(value) ? 0 : value);
  };

  const handlePayment = () => {
    alert(`Thank you! You are paying $${(totalAmount + donation).toFixed(2)} and contributing to planting ${donation} trees 🌳`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h1 className="text-4xl font-bold mb-8 text-green-700 flex items-center">
        <FaLeaf className="mr-2" /> Checkout Summary
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">
          Your cart is empty. <Link to="/" className="text-blue-600 underline">Go Shopping</Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {cart.map((item, index) => {
              const productCO2 = co2Data.find((p) => p.id === item.id)?.carbonFootprint || 0;

              return (
                <div key={index} className="mb-6 border rounded-lg p-4 shadow hover:shadow-md">
                  <CartItem item={item} />
                  <p className="text-blue-700 mt-2 font-medium">
                    🌍 Carbon Footprint: {productCO2 * item.quantity} kg CO₂
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Order Summary</h2>

            <p className="text-lg mb-2">🛒 Total Items: {cart.length}</p>
            <p className="text-lg mb-2">🌿 Total Carbon Footprint: <span className="font-semibold">{totalCarbonFootprint} kg CO₂</span></p>
            <p className="text-lg mb-4">💲 Total Price: <span className="font-semibold">${totalAmount.toFixed(2)}</span></p>

            {/* Donate to Plant Trees */}
            <div className="mb-4 bg-green-50 p-4 rounded-md flex items-start gap-3 shadow-inner">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C10 7 3 7 3 12c0 2.5 2 4 4 4 .5 0 1-.5 1-1s-.5-1-1-1c-1 0-2-1-2-2 0-2.5 5-3 7-7s7 4 7 7c0 1-1 2-2 2-1 0-2 1-2 2s1 2 2 2c2 0 4-1.5 4-4 0-5-7-5-9-10z" />
                </svg>
              </div>

              <div className="flex-grow">
                <label className="block font-medium mb-1">
                  Donate to Plant More Trees <span className="text-sm text-gray-600">(1 USD = 1 Tree)</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    min="0"
                    className="border p-2 w-28 rounded mr-2"
                    value={donation}
                    onChange={handleDonationChange}
                  />
                  <span className="text-green-700 font-medium">USD</span>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">
              💳 Total Payable Amount: ${(totalAmount + donation).toFixed(2)} USD
            </h2>

            <button
              onClick={handlePayment}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold text-lg shadow transition transform hover:scale-105"
            >
              Pay Now & Contribute 🌳
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
