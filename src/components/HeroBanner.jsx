import React from "react";

const HeroBanner = () => (
  <div className="w-full bg-blue-600 text-white py-10 px-4 flex flex-col items-center justify-center mb-8 rounded-b-2xl shadow-lg">
    <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-center">Hot Summer Savings on What's Cool</h1>
    <p className="text-lg md:text-xl mb-6 text-center max-w-2xl">Shop the latest deals, trending products, and exclusive offers. Save more, live better—just like Walmart!</p>
    <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-8 rounded-full text-lg shadow transition-colors duration-200">Shop Now</button>
  </div>
);

export default HeroBanner; 