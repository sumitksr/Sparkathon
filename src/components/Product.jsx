import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, increment, decrement } from "../redux/Slices/CartSlice";
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";

const Product = ({post}) => {

  const {cart} = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  }

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  }

  const cartItem = cart.find((p) => p.id === post.id);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4 relative">
      {post.price < 50 && (
        <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-gray-900">Rollback</span>
      )}
      <div className="w-full flex justify-center mb-3">
        <img src={post.image} className="h-40 w-40 object-contain" alt={post.title} />
      </div>
      <div className="w-full">
        <p className="text-gray-900 font-bold text-base md:text-lg mb-1 truncate" title={post.title}>{post.title}</p>
        <p className="text-gray-500 text-xs mb-2 line-clamp-2">{post.description.split(" ").slice(0, 15).join(" ") + "..."}</p>
      </div>
      <div className="flex items-center justify-between w-full mt-2">
        <span className="text-green-600 font-bold text-lg">${post.price}</span>
      </div>
      {cartItem ? (
        <div className="mt-4 w-full flex items-center justify-center gap-3">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
            onClick={() => dispatch(decrement(post.id))}
          >
            <FaMinus />
          </button>
          <span className="font-bold text-lg w-8 text-center">{cartItem.quantity}</span>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
            onClick={() => dispatch(increment(post.id))}
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 text-sm shadow"
          onClick={addToCart}
        >
          <FaShoppingCart /> Add to Cart
        </button>
      )}
    </div>
  );
};

export default Product;
