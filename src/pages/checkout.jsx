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
    alert(`Proceeding to payment of $${(totalAmount + donation).toFixed(2)}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
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
                    Carbon Footprint: {productCO2 * item.quantity} kg CO₂
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Order Summary</h2>

            <p className="text-lg mb-2">Total Items: {cart.length}</p>
            <p className="text-lg mb-2">Total Carbon Footprint: <span className="font-semibold">{totalCarbonFootprint} kg CO₂</span></p>
            <p className="text-lg mb-4">Total Price: <span className="font-semibold">${totalAmount.toFixed(2)}</span></p>

            <div className="mb-4">
              <label className="block mb-2 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.707-9.707a1 1 0 011.414 0L12 10.586V7a1 1 0 112 0v6a1 1 0 01-2 0v-2.586l-1.293 1.293a1 1 0 01-1.414-1.414z" clipRule="evenodd" />
                </svg>
                Donate to Plant More Trees(1 USD=1 Tree):
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="border p-2 w-32 rounded mr-2"
                  value={donation}
                  onChange={handleDonationChange}
                />
                <span className="text-green-700 font-medium">USD</span>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">
              Total Payable Amount: ${(totalAmount + donation).toFixed(2)} USD
            </h2>

            <button
              onClick={handlePayment}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold text-lg shadow"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}