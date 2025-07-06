import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import Header from './Header';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 6;
  const totalPages = 6; // Fixed total pages

  useEffect(() => {
    setPage(1); // Reset to page 1 when query changes
  }, [query]);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const skip = (page - 1) * limit;

    fetch(`https://dummyjson.com/products/search?q=${query.toLowerCase()}&limit=${limit}&skip=${skip}`)
      .then(async (res) => {
        const text = await res.text();
        if (!text) {
          setProducts([]);
          return;
        }

        try {
          const data = JSON.parse(text);
          setProducts(Array.isArray(data) ? data : data.products || []);
        } catch (err) {
          console.error("Failed to parse JSON:", err);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Search fetch error:", err);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  const handleAddToCart = (product) => {
    const cart = JSON?.parse(localStorage.getItem("cart")) || [];
    const exists = cart?.find((item) => item.id === product.id);
    if (exists) return;

    cart.push({ ...product, quantity: 1 });
     localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title || product.name} added to cart ✅`);
  };

  return (
    <>
      <Header />
      <div className="p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Search Results for "<span className="text-blue-500">{query}</span>"
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
             
                  <ProductCard
                    id={product.id}
                    imgUrl={product.image || product.images?.[0] || "/no-image.png"}
                    productTitle={product.title || product.name}
                    price={product.price}
                    category={product.category}
                    onAddToCart={(e) => {
                      handleAddToCart(product);
                    }}
                  />
              
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </>
  );
}
