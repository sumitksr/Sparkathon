import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import co2Data from "../components/co2";
import CartItem from "../components/CartItem";
import { FaLeaf, FaTree } from "react-icons/fa";

export default function Checkout() {
  const { cart } = useSelector((state) => state);
  const [donation, setDonation] = useState(0);
  const [shippingOption, setShippingOption] = useState("standard");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingEmissions = shippingOption === "standard" ? 7 : 2;
  const ecoDiscount = shippingOption === "eco" ? totalAmount * 0.02 : 0;
  const totalCarbonFootprint = cart.reduce((sum, item) => {
    const productCO2 = co2Data.find((p) => p.id === item.id)?.carbonFootprint || 0;
    return sum + productCO2 * (item.quantity || 1);
  }, 0);

  const totalCO2WithShipping = totalCarbonFootprint + shippingEmissions;
  const totalTreesPlanted = donation;
  const estimatedCO2Offset = totalTreesPlanted * 21;
  const ecoPoints = Math.floor(totalCO2WithShipping / 10 + totalTreesPlanted * 5);

  const payableAmount = totalAmount - ecoDiscount + donation;

  const handleDonationChange = (e) => {
    const value = parseFloat(e.target.value);
    setDonation(isNaN(value) ? 0 : value);
  };

  const handlePayment = () => {
    alert(`Thank you for making a difference! Total paid: $${payableAmount.toFixed(2)} USD and contributing to planting ${donation} trees 🌳`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-tr from-green-50 to-white shadow-xl rounded-2xl mt-8">
      <h1 className="text-4xl font-extrabold mb-8 text-green-800 flex items-center">
        <FaLeaf className="mr-3" /> Checkout & Your Eco Impact
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">
          Your cart is empty. <Link to="/" className="text-blue-600 underline">Explore Eco Products</Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            {cart.map((item, index) => {
              const productCO2 = co2Data.find((p) => p.id === item.id)?.carbonFootprint || 0;
              const greenerAlternative = co2Data
                .filter((p) => p.id !== item.id && p.carbonFootprint < productCO2)
                .sort((a, b) => a.carbonFootprint - b.carbonFootprint)[0];

              return (
                <div key={index} className="mb-6 bg-white border rounded-xl p-5 shadow hover:shadow-lg">
                  <CartItem item={item} />
                  <p className="text-blue-700 mt-2 font-medium">
                    🌍 Carbon Footprint: {productCO2 * item.quantity} kg CO₂
                  </p>

                  {greenerAlternative && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg shadow">
                      <h3 className="text-green-800 font-bold mb-2">🌱 Suggested Eco-Friendly Alternative:</h3>
                      <div>
                        <p className="font-semibold">{greenerAlternative.name}</p>
                        <p className="text-sm text-gray-700">Carbon Footprint: {greenerAlternative.carbonFootprint} kg CO₂</p>
                        <p className="text-green-700 font-medium">${greenerAlternative.price}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Your Order Summary</h2>

            <p className="mb-2">🛒 <span className="font-medium">Items:</span> {cart.length}</p>
            <p className="mb-2">🌍 <span className="font-medium">Total CO₂ Footprint (with shipping):</span> {totalCO2WithShipping} kg</p>
            <p className="mb-2">💵 <span className="font-medium">Total Price:</span> ${totalAmount.toFixed(2)}</p>
            {shippingOption === "eco" && (
              <p className="text-green-700 mb-2">🎉 Eco Delivery Discount Applied: -${ecoDiscount.toFixed(2)}</p>
            )}

            <div className="mb-4 p-4 bg-green-50 rounded">
              <p className="font-medium mb-2">🚚 Select Shipping Option:</p>
              <label className="block mb-1">
                <input
                  type="radio"
                  name="shipping"
                  value="standard"
                  checked={shippingOption === "standard"}
                  onChange={(e) => setShippingOption(e.target.value)}
                  className="mr-2"
                />
                Standard Delivery (7 kg CO₂)
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="shipping"
                  value="eco"
                  checked={shippingOption === "eco"}
                  onChange={(e) => setShippingOption(e.target.value)}
                  className="mr-2"
                />
                Eco Delivery (2 kg CO₂, arrives slower, 2% Discount)
              </label>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold flex items-center">
                <FaTree className="mr-2 text-green-500" />
                Donate to Plant Trees (1 USD = 1 Tree):
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                min="0"
                className="border p-2 w-32 rounded mr-2"
                value={donation}
                onChange={handleDonationChange}
              />
              <span className="text-green-700 font-medium">USD</span>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p>🌳 <strong>{totalTreesPlanted}</strong> trees will be planted</p>
              <p>💨 Offsetting approx <strong>{estimatedCO2Offset} kg CO₂</strong></p>
              <p>🏅 Earned <strong>{ecoPoints} EcoPoints</strong></p>
            </div>

            <h2 className="text-xl font-bold mb-4">
              Total Payable: ${payableAmount.toFixed(2)} USD
            </h2>

            <button
              onClick={handlePayment}
              className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 text-lg shadow-lg"
            >
              Pay & Offset Your Impact
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
