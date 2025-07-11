import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Checkout from "./pages/checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Leaderboard from "./pages/Leaderboard";
import { EcoModeProvider } from "./components/EcoModeContext";
import { AuthProvider } from "./context/AuthContext";


const App = () => {
  return (
    <AuthProvider>
      <EcoModeProvider>
        <div>
          <div className="bg-slate-900">
            <Navbar/>
          </div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="*" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/leaderboard" element={<Leaderboard/>} />
          
          </Routes>
        </div>
      </EcoModeProvider>
    </AuthProvider>
  )
};

export default App;
