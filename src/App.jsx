import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Checkout from "./pages/checkout";
import { EcoModeProvider } from "./components/EcoModeContext";


const App = () => {
  return (
    <EcoModeProvider>
      <div>
        <div className="bg-slate-900">
          <Navbar/>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </div>
    </EcoModeProvider>
  )
};

export default App;
