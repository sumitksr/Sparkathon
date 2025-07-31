import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Spinner from "../components/Spinner";
import Product from "../components/Product";
import HeroBanner from "../components/HeroBanner";
import RefurbishedSection from "../components/refurbished.jsx";
import { useEcoMode } from "../components/EcoModeContext";

import { products as localProducts } from "../data";

// Generate a mock eco rating from product ID
const getAssumedEcoRating = (id) => {
  return (id % 5) + 1; // Value between 1 and 5
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  const { ecoMode } = useEcoMode();

  // Load product data from localProducts
  function fetchProductData() {
    setLoading(true);
    try {
      const dataWithEco = localProducts.map((item) => ({
        ...item,
        ecoRating: getAssumedEcoRating(item.id),
      }));
      setPosts(dataWithEco);
    } catch (error) {
      console.error("Error loading local data:", error);
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  // Filter and sort posts
  let filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm)
  );

  // In eco mode, sort by eco rating (high to low)
  if (ecoMode) {
    filteredPosts = [...filteredPosts].sort(
      (a, b) => (b.ecoRating || 0) - (a.ecoRating || 0)
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        ecoMode ? "bg-yellow-50" : "bg-gray-50"
      }`}
    >
      <HeroBanner />

      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-center sm:text-left">
          Shop the Latest
        </h2>

        {loading ? (
          <Spinner />
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {filteredPosts.map((post) => (
              <Product key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p>No Data Found</p>
          </div>
        )}

        {/* Refurbished section visible only in eco mode */}
        {ecoMode && <RefurbishedSection />}
      </div>
    </div>
  );
}
