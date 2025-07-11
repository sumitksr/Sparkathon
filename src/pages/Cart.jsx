import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { FaShoppingCart } from "react-icons/fa";
import { selectCart, selectCartTotal } from "../redux/Slices/CartSlice";

const Cart = () => {
  const cart = useSelector(selectCart);
  const totalAmount = useSelector(selectCartTotal);

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 py-4">
      {cart.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          
          {/* Cart Items Section */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 flex items-center text-green-700">
              <FaShoppingCart className="mr-2" /> Your Cart
            </h2>
            {cart.map((item, index) => (
              <div key={item.id} className="mb-3 sm:mb-4">
                <CartItem item={item} itemIndex={index} />
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="w-full md:w-1/3 bg-gray-50 rounded-xl p-4 sm:p-6 shadow-lg h-fit mt-4 md:mt-0">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-green-800">Summary</h3>
            <p className="text-base sm:text-lg mb-1 sm:mb-2">
              <span className="font-medium">Total Items:</span> {cart.length}
            </p>
            <p className="text-base sm:text-lg mb-3 sm:mb-4">
              <span className="font-medium">Total Amount:</span> ${totalAmount.toFixed(2)}
            </p>

            <Link to="/checkout">
              <button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 sm:py-3 rounded-lg transition duration-300 text-base sm:text-lg shadow">
                Proceed to Checkout
              </button>
            </Link>
          </div>

        </div>
      ) : (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-2 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 sm:mb-3">Your cart is empty</h1>
          <Link to="/">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition w-full sm:w-auto">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
