import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react'; // Optional: use Lucide icons

function ProductCard({ id, imgUrl, productTitle, price, category, onAddToCart }) {
  const [addFav, setAddFav] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-200 relative cursor-pointer group"
      onClick={handleNavigate}
    >
      {/* Favorite icon */}
      <button
        className="absolute top-3 right-3 z-10 text-gray-500 hover:text-red-500"
        onClick={(e) => {
          e.stopPropagation();
          setAddFav(!addFav);
        }}
      >
        <Heart fill={addFav ? 'red' : 'none'} strokeWidth={2} />
      </button>

      {/* Product image */}
      <img
        src={imgUrl}
        alt={productTitle}
        className="w-full h-48 object-contain mb-4 transition-transform group-hover:scale-105"
      />

      {/* Product title */}
      <h2 className="md:text-lg text-sm text-gray-800 font-semibold line-clamp-1">
        {productTitle}
      </h2>

      {/* Price */}
      <p className="text-orange-600 font-bold mt-2">${Math.floor(price)}</p>

      {/* Category */}
      <p className="text-sm text-gray-500 mt-1 capitalize">{category}</p>

      {/* Add to Cart Button */}
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent navigating to product page
            onAddToCart();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
