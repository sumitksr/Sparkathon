import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, increment, decrement, selectCartItemById } from "../redux/Slices/CartSlice";
import { FaShoppingCart, FaPlus, FaMinus, FaLeaf } from "react-icons/fa";
import co2Data from "./co2";
import { useEcoMode } from "./EcoModeContext";

const Product = ({ post }) => {
  const cartItem = useSelector((state) => selectCartItemById(state, post.id));
  const dispatch = useDispatch();
  const { ecoMode } = useEcoMode();

  // Find CO2 from dataset
  const productCO2 = co2Data.find((item) => item.id === post.id)?.carbonFootprint || 0;

  const addToCart = () => {
    const payload = { ...post, carbonFootprint: productCO2 }; // Add CO2 to cart item
    dispatch(add(payload));
    toast.success("Item added to Cart");
  };

  // Remove from cart functionality (unused but kept for future use)
  // const removeFromCart = () => {
  //   dispatch(remove(post.id));
  //   toast.error("Item removed from Cart");
  // };

  // Eco rating badge color
  let ecoColor = "bg-gray-300 text-gray-700";
  if (post.ecoRating >= 4) ecoColor = "bg-green-200 text-green-800";
  else if (post.ecoRating >= 2.5) ecoColor = "bg-yellow-200 text-yellow-800";

  let bgColor = "bg-white";
  if (post.ecoRating >= 4) bgColor = "bg-green-100";
  else if (post.ecoRating >= 2) bgColor = "bg-orange-100";
  else if (post.ecoRating >= 1) bgColor = "bg-red-200";

  const mainBtn = ecoMode ? "bg-green-400 hover:bg-green-500" : "bg-blue-600 hover:bg-blue-700";
  const textBtn = "text-white";

  return (
    <div className={`${bgColor} rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between p-4 relative h-full`}>
      
      <span
        className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold shadow ${ecoColor}`}
        title={`Eco Rating: ${post.ecoRating}`}
      >
        <FaLeaf className="inline-block" />
        {post.ecoRating}
      </span>

      {post.price < 50 && (
        <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-gray-900">
          Rollback
        </span>
      )}

      <div className="w-full flex justify-center mb-3">
        <img src={post.image} className="h-40 w-40 object-contain" alt={post.title} />
      </div>

      <div className="flex-grow flex flex-col justify-start">
        <p className="text-gray-900 font-bold text-base md:text-lg mb-1 truncate" title={post.title}>
          {post.title}
        </p>
        <p className="text-gray-500 text-xs mb-2 line-clamp-2">
          {post.description.split(" ").slice(0, 15).join(" ") + "..."}
        </p>
        <span className="text-green-600 font-bold text-lg mt-auto">${post.price}</span>
      </div>

      {cartItem ? (
        <div className="mt-4 w-full flex items-center justify-center gap-3">
          <button className={`${mainBtn} ${textBtn} rounded-full p-2`} onClick={() => dispatch(decrement(post.id))}>
            <FaMinus />
          </button>
          <span className="font-bold text-lg w-8 text-center">{cartItem.quantity}</span>
          <button className={`${mainBtn} ${textBtn} rounded-full p-2`} onClick={() => dispatch(increment(post.id))}>
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          className={`mt-4 w-full flex items-center justify-center gap-2 ${mainBtn} ${textBtn} font-semibold py-2 rounded-lg transition-colors duration-200 text-sm shadow`}
          onClick={addToCart}
        >
          <FaShoppingCart /> Add to Cart
        </button>
      )}
    </div>
  );
};

export default Product;
