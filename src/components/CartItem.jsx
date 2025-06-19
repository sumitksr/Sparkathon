import {AiFillDelete} from "react-icons/ai"
import { useDispatch } from "react-redux";
import { remove, increment, decrement } from "../redux/Slices/CartSlice";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-hot-toast";

const CartItem = ({item, itemIndex}) => {
  const dispatch = useDispatch();

  const handleDecrement = () => {
    if (item.quantity === 1) {
      dispatch(remove(item.id));
      toast.success("Item Removed");
    } else {
      dispatch(decrement(item.id));
    }
  };
  const handleIncrement = () => {
    dispatch(increment(item.id));
  };

  return (
    <div className="flex items-center p-2 md:p-5 justify-between   mt-2 mb-2 md:mx-5 ">
      <div className="flex flex-col md:flex-row p-0 md:p-3 gap-5 items-center">
        <div className="w-[30%]">
          <img className="object-cover " src={item.image} alt={item.title} />
        </div>
        <div className="md:ml-10 self-start space-y-5 w-[100%] md:w-[70%]">
          <h1 className="text-xl text-slate-700 font-semibold">{item.title}</h1>
          <h1 className="text-base text-slate-700 font-medium">{item.description}</h1>
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg text-green-600">{item.price}</p>
            <div className="flex items-center gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2" onClick={handleDecrement}>
                <FaMinus />
              </button>
              <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2" onClick={handleIncrement}>
                <FaPlus />
              </button>
            </div>
            <div className="text-red-800 bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3"
              onClick={() => { dispatch(remove(item.id)); toast.success("Item Removed"); }}>
              <AiFillDelete />
            </div>
          </div>

        </div>


      </div>

    </div>
  );
};

export default CartItem;
