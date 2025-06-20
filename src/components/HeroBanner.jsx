import React from "react";
import { useEcoMode } from "./EcoModeContext";

const EcoToggle = () => {
  const { ecoMode, toggleEcoMode } = useEcoMode();
  // For w-44 (176px), shifter w-6 (24px), left-2 (8px), px-[0.3rem] (~4.8px)
  // Right position: 176 - 24 - 8 - 8 = 136px (translate-x-[136px])
  // But Tailwind doesn't support px values by default, so use translate-x-[136px]
  return (
    <button
      onClick={toggleEcoMode}
      className={`relative flex items-center w-44 h-10 rounded-full transition-colors duration-500 focus:outline-none shadow-lg mb-4 px-[0.3rem]
        ${ecoMode ? "bg-green-200" : "bg-blue-200"}`}
      aria-pressed={ecoMode}
      aria-label="Toggle Eco Mode"
      style={{ minWidth: 176 }}
    >
      {/* Shifter (smaller, even movement) */}
      <span
        className={`absolute top-2 left-2 w-6 h-6 rounded-full shadow transition-transform duration-500
          ${ecoMode ? "translate-x-[136px] bg-green-400" : "translate-x-0 bg-blue-400"}`}
        style={{ zIndex: 1 }}
      />
      {/* Centered Text */}
      <span className={`w-full text-center font-bold text-base transition-colors duration-500 z-10 ${ecoMode ? "text-green-700" : "text-blue-700"}`}>
        {ecoMode ? "Eco Mode On" : "Eco Mode Off"}
      </span>
    </button>
  );
};

const HeroBanner = () => {
  const { ecoMode } = useEcoMode();
  return (
    <div
      className={`w-full text-white py-10 px-4 flex flex-col items-center justify-center mb-8 rounded-b-2xl shadow-lg transition-colors duration-700
        ${ecoMode ? "bg-green-400 text-green-900" : "bg-blue-600"}`}
    >
      <EcoToggle />
      <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-center">Hot Summer Savings on What's Cool</h1>
      <p className="text-lg md:text-xl mb-6 text-center max-w-2xl">Shop the latest deals, trending products, and exclusive offers. Save more, live better—just like Walmart!</p>
      <button className={`bg-yellow-400 hover:bg-yellow-300 font-bold py-3 px-8 rounded-full text-lg shadow transition-colors duration-200 ${ecoMode ? "text-white" : "text-blue-900"}`}>Shop Now</button>
    </div>
  );
};

export default HeroBanner; 