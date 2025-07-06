import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState("");

  // Fetch selected product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found!");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch related products (same category)
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        if (!product?.category) return;
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${product.category}`
        );
        const data = await res.json();
        const filtered = data.filter((p) => p.id !== product.id);
        setRelatedProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error("Failed to load related products", err);
      }
    };
    fetchRelated();
  }, [product]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      alert("Product is already in cart.");
      return;
    }
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart ✅`);
  };

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      {/* Product Info */}
      <div className="bg-white rounded-lg shadow p-6 grid md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-contain rounded"
        />
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">{product.title}</h1>
          <p className="text-xl text-orange-600 font-bold mt-3">${product.price}</p>
          <p className="text-gray-500 capitalize mt-1">Category: {product.category}</p>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            {product.description || "No description available."}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">You might also like</h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                onClick={() => (window.location.href = `/product/${p.id}`)}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="text-sm font-semibold line-clamp-1">{p.title}</h3>
                <p className="text-orange-600 font-bold">${p.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No related products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductView;
