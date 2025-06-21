import React from "react";
import { useEcoMode } from "./EcoModeContext";
import Product from "./Product";

// Sample refurbished products (you can replace this with dynamic data)
const refurbishedProducts = [
  {
    id: 201,
    title: "Refurbished iPhone 12",
    description: "Like new. 6-month warranty. Great condition.",
    price: 449,
    image: "image.png",
    ecoRating: 5,
  },
  {
    id: 202,
    title: "Refurbished Laptop",
    description: "SSD upgraded, battery replaced. Eco-friendly!",
    price: 599,
    image: "download.jpeg",
    ecoRating: 4.5,
  },
  {
    id: 203,
    title: "EcoSmart Blender (Refurbished)",
    description: "Certified refurbished kitchen appliance with warranty.",
    price: 89,
    image: "blender.jpg",
    ecoRating: 4.2,
  },
];

const RefurbishedSection = () => {
  const { ecoMode } = useEcoMode();

  if (!ecoMode) return null;

  return (
    <section className="mt-10 bg-white-50 rounded-lg p-6 shadow-none">
      <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
        ♻️ Refurbished Deals
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {refurbishedProducts.map((item) => (
          <Product key={item.id} post={item} />
        ))}
      </div>
    </section>
  );
};

export default RefurbishedSection;