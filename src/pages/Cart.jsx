import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { FaLeaf, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price * (curr.quantity || 1), 0));
  }, [cart]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {cart.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Cart Items Section */}
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-bold mb-4 flex items-center text-green-700">
              <FaShoppingCart className="mr-2" /> Your Cart
            </h2>
            {cart.map((item, index) => (
              <div key={item.id} className="mb-4">
                <CartItem item={item} itemIndex={index} />
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="w-full md:w-1/3 bg-gray-50 rounded-xl p-6 shadow-lg h-fit">
            <h3 className="text-2xl font-bold mb-4 text-green-800">Summary</h3>
            <p className="text-lg mb-2">
              <span className="font-medium">Total Items:</span> {cart.length}
            </p>
            <p className="text-lg mb-4">
              <span className="font-medium">Total Amount:</span> ${totalAmount.toFixed(2)}
            </p>

            <Link to="/checkout">
              <button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition duration-300 text-lg shadow">
                Proceed to Checkout
              </button>
            </Link>
          </div>

        </div>
      ) : (
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h1>
          <Link to="/">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
